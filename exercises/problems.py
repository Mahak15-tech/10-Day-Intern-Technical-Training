# 1. Reverse a string

text = "hello"
print(text[::-1])


# 2. Find the largest number in a list

num = [22, 33, 44, 66, 55, 77]

largest = num[0]

for n in num:
    if n > largest:
        largest = n

print("Largest:", largest)


# 3. Check whether a string is a palindrome

text = "madam"

if text == text[::-1]:
    print("Palindrome")
else:
    print("Not a palindrome")


# 4. Count vowels in a string

text = "hello world"
count = 0

for char in text:
    if char.lower() in "aeiou":
        count += 1

print("Vowels:", count)


# 5. Find the sum of all elements in a list

numbers = [10, 20, 30, 40, 50]

total = 0

for num in numbers:
    total += num

print("Sum:", total)


# 6. Remove duplicates from a list

numbers = [10, 20, 10, 30, 20, 40]

unique_numbers = []

for num in numbers:
    if num not in unique_numbers:
        unique_numbers.append(num)

print("Without duplicates:", unique_numbers)


# 7. Find the second-largest number

numbers = [10, 50, 30, 80, 40]

largest = numbers[0]
second_largest = numbers[0]

for num in numbers:
    if num > largest:
        second_largest = largest
        largest = num
    elif num > second_largest and num != largest:
        second_largest = num

print("Second largest:", second_largest)


# 8. Count the frequency of each element

numbers = [10, 20, 10, 30, 20, 10]

frequency = {}

for num in numbers:
    if num in frequency:
        frequency[num] += 1
    else:
        frequency[num] = 1

print("Frequency:", frequency)


# 9. Linear search

numbers = [10, 20, 30, 40, 50]
target = 30

found = False

for num in numbers:
    if num == target:
        found = True
        break

if found:
    print("Element found")
else:
    print("Element not found")


# 10. Binary search

numbers = [10, 20, 30, 40, 50, 60, 70]
target = 50

left = 0
right = len(numbers) - 1
found = False

while left <= right:
    middle = (left + right) // 2

    if numbers[middle] == target:
        found = True
        break
    elif numbers[middle] < target:
        left = middle + 1
    else:
        right = middle - 1

if found:
    print("Element found")
else:
    print("Element not found")


# 11. Sort a list without using sort()

numbers = [40, 10, 30, 20, 50]

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        if numbers[i] > numbers[j]:
            numbers[i], numbers[j] = numbers[j], numbers[i]

print("Sorted list:", numbers)


# 12. Check whether a number is prime

number = 17
is_prime = True

if number < 2:
    is_prime = False
else:
    for i in range(2, number):
        if number % i == 0:
            is_prime = False
            break

if is_prime:
    print("Prime number")
else:
    print("Not a prime number")


# 13. Factorial using recursion

def factorial(n):
    if n == 0 or n == 1:
        return 1

    return n * factorial(n - 1)


print("Factorial:", factorial(5))


# 14. Fibonacci series

n = 10

a = 0
b = 1

for i in range(n):
    print(a, end=" ")
    a, b = b, a + b

print()


# 15. Find the missing number from 1 to n

numbers = [1, 2, 3, 5, 6]
n = 6

total = n * (n + 1) // 2

for num in numbers:
    total -= num

print("Missing number:", total)