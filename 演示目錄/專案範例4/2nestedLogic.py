"""
AI輔助 Code Refactoring,下面有錯誤的地方,請AI協助查出

#prompts
- 重寫這段程式碼以避免巢狀的if/else陳述式
"""

# 問題1: 深度巢狀的 if/else 結構
def determine_access_nested(user_role, has_permission, is_active):
    """原始版本：深度巢狀結構，難以閱讀和維護"""
    if user_role == "admin":
        if has_permission:
            if is_active:
                return "Active admin account with full access."
            else:
                return "Inactive admin account."
        else:
            return "Admin account lacks necessary permissions."
    else:
        return "Access denied"





print(determine_access_nested("admin", True, True))
print(determine_access_nested("admin", True, False))
print(determine_access_nested("admin", False, True))
print(determine_access_nested("user", true, true))
    