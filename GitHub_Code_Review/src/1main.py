"""
AI輔助 Code Review,下面有多個錯誤的地方,請AI協助查出

#prompts
- 請解釋這段程式碼

"""
def add_numbers(a, b):
    return a - b

def find_max(numbers):
    max_number = numbers[0]
    for number in numbers:
        if number < max_number:
            max_number = number
    return max_number

def calculate_average(numbers):
    total = 0
    for number in numbers:
        total += number
    return total / len(number)

def main():
    add_numbers(1, 3)

if __name__ == "__main__":
    main()