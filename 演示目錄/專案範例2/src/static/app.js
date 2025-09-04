document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message and select options
      activitiesList.innerHTML = "";
      activitySelect.innerHTML = '<option value="">-- 請選擇活動 --</option>';

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        // 新增參與者清單 HTML
        let participantsHtml = "";
        if (details.participants && details.participants.length > 0) {
          participantsHtml = `
            <div class="participants-section">
              <strong>參與者：</strong>
              <ul class="participants-list">
                ${details.participants.map(email => `
                  <li>
                    ${email}
                    <button class="delete-participant" data-activity="${name}" data-email="${email}" title="取消報名">
                      ✕
                    </button>
                  </li>
                `).join("")}
              </ul>
            </div>
          `;
        } else {
          participantsHtml = `
            <div class="participants-section">
              <strong>參與者：</strong>
              <span class="no-participants">目前尚無人報名</span>
            </div>
          `;
        }

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          ${participantsHtml}
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
        // 重新載入活動列表以更新顯示
        await fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // 處理參與者移除
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-participant')) {
      const activity = event.target.dataset.activity;
      const email = event.target.dataset.email;
      
      if (confirm(`確定要取消 ${email} 的 ${activity} 活動報名嗎？`)) {
        try {
          const response = await fetch(
            `/activities/${encodeURIComponent(activity)}/participants/${encodeURIComponent(email)}`,
            {
              method: 'DELETE'
            }
          );

          const result = await response.json();

          if (response.ok) {
            messageDiv.textContent = result.message;
            messageDiv.className = 'success';
            // 重新載入活動列表
            fetchActivities();
          } else {
            messageDiv.textContent = result.detail || '發生錯誤';
            messageDiv.className = 'error';
          }
        } catch (error) {
          messageDiv.textContent = '取消報名失敗，請稍後再試';
          messageDiv.className = 'error';
          console.error('Error removing participant:', error);
        }

        messageDiv.classList.remove('hidden');
        setTimeout(() => {
          messageDiv.classList.add('hidden');
        }, 5000);
      }
    }
  });

  // Initialize app
  fetchActivities();
});
