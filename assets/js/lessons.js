export const courseUnits = [
  { title: "Python foundations", firstLesson: 1, lastLesson: 6 },
  { title: "Collections and reusable code", firstLesson: 7, lastLesson: 13 },
  { title: "Reliable, professional programs", firstLesson: 14, lastLesson: 20 },
  { title: "Applied Python projects", firstLesson: 21, lastLesson: 24 },
  { title: "Intermediate Python foundations", firstLesson: 25, lastLesson: 39 },
];

export const lessons = [
  {
    id: "v3-01",
    number: "01",
    title: "Start coding with Python",
    intro:
      "Meet Python, run instructions, read output, and learn how a program executes from top to bottom.",
    example:
      'print("Welcome to Python!")\nprint("2 + 3 =", 2 + 3)\nprint("You just ran a program.")',
    sections: [
      {
        heading: "Programs are instructions",
        body: "A program is a set of instructions a computer follows. Python executes ordinary statements from top to bottom. A mistake on one line may stop later lines from running, so reading the order is an important debugging skill.",
        code: 'print("First")\nprint("Second")\nprint("Third")',
      },
      {
        heading: "Use print() to inspect a result",
        body: "print() displays values. Put text in quotes; put calculations or variable names outside the quotes. Separate values with commas to display them with spaces.",
        code: 'print("Hello, Maya!")\nprint(7 * 6)\nprint("Total:", 7 * 6)',
      },
      {
        heading: "Small experiments teach quickly",
        body: "Change one value, run the program again, and compare the result. This is a safe way to learn what an instruction does. Python is case-sensitive: print works, but Print is a different name.",
        callout:
          "Practice habit: predict the output first, run the code, then explain any difference.",
      },
    ],
    exercises: [
      {
        title: "Introduce yourself",
        task: "Print your name, a hobby, and one reason you want to learn Python on separate lines.",
        starter: 'print("My name is ...")\n',
        hint: "Use one print() call for each line.",
        solution:
          'print("My name is Sam")\nprint("I enjoy drawing")\nprint("I want to automate tasks")',
      },
      {
        title: "Make a mini receipt",
        task: "Print the item name, its price, and the total for three items.",
        starter: 'print("Notebook")\nprint("Price:", 4.5)\n',
        hint: "Python can multiply numbers inside print().",
        solution:
          'price = 4.5\nquantity = 3\nprint("Notebook")\nprint("Each:", price)\nprint("Total:", price * quantity)',
      },
      {
        title: "Predict before running",
        task: "Add another print() call and predict the order in which all lines appear.",
        starter: 'print("A")\nprint("B")\nprint("C")\n',
        hint: "The order in the file is the execution order.",
        solution: 'print("A")\nprint("B")\nprint("C")\nprint("D")',
      },
    ],
    quizzes: [
      {
        q: "What does print(2 + 3) display?",
        options: ["2 + 3", "5", "print"],
        answer: 1,
        why: "Python calculates the expression first, then print() displays the result.",
      },
      {
        q: "In what order does Python run ordinary statements?",
        options: ["Bottom to top", "Top to bottom", "Random order"],
        answer: 1,
        why: "Unless control flow changes the path, Python executes statements from top to bottom.",
      },
      {
        q: "Which line displays the word Python as text?",
        options: ["print(Python)", 'print("Python")', "show(Python)"],
        answer: 1,
        why: "Quotation marks tell Python that Python is text rather than a variable name.",
      },
    ],
  },
  {
    id: "v3-02",
    number: "02",
    title: "Variables and naming",
    intro:
      "Store values under meaningful names, update them, and build readable programs.",
    example:
      'student_name = "Maya"\nscore = 8\nscore = score + 2\nprint(student_name, "scored", score)',
    sections: [
      {
        heading: "Assign a value to a name",
        body: "The = sign assigns the value on its right to the name on its left. Read `score = 8` as “store 8 in score.” Assignment is not the same as a mathematical equality test.",
        code: 'city = "Beirut"\nvisitors = 120\nprint(city, visitors)',
      },
      {
        heading: "A variable can be updated",
        body: "An assignment can use the current value of a variable to calculate a new one. `total += amount` is a short form of `total = total + amount`.",
        code: "points = 10\npoints = points + 5\npoints += 2\nprint(points)  # 17",
      },
      {
        heading: "Choose names for people",
        body: "Use descriptive `snake_case` names such as `weekly_total`. Names may contain letters, digits, and underscores, but cannot start with a digit. Names are case-sensitive and should not shadow built-in names such as `list` or `sum`.",
        code: "item_count = 3\nprice_per_item = 4.5\norder_total = item_count * price_per_item\nprint(order_total)",
      },
    ],
    exercises: [
      {
        title: "Personal profile",
        task: "Create variables for a person's name, city, and favorite number, then print a sentence using them.",
        starter: 'name = "Your name"\ncity = "Your city"\n',
        hint: "Pass multiple values to print(), or combine strings with an f-string.",
        solution:
          'name = "Maya"\ncity = "Beirut"\nfavorite_number = 7\nprint(f"{name} lives in {city} and likes {favorite_number}.")',
      },
      {
        title: "Update a wallet",
        task: "Start with 25.50, add 10, subtract 4.25, and display the remaining balance.",
        starter: "balance = 25.50\n",
        hint: "Update balance after each transaction.",
        solution:
          "balance = 25.50\nbalance += 10\nbalance -= 4.25\nprint(balance)",
      },
      {
        title: "Repair unclear names",
        task: "Replace a, b, and c with meaningful names for quantity, unit price, and total.",
        starter: "a = 4\nb = 2.5\nc = a * b\nprint(c)",
        hint: "Names such as quantity and unit_price describe the stored meaning.",
        solution:
          "quantity = 4\nunit_price = 2.5\ntotal = quantity * unit_price\nprint(total)",
      },
    ],
    quizzes: [
      {
        q: "What does `count = count + 1` do?",
        options: [
          "Checks whether count is one",
          "Increases count by one",
          "Creates a text value",
        ],
        answer: 1,
        why: "Python reads the current count, adds one, then assigns the new value back to count.",
      },
      {
        q: "Which is a valid, readable Python variable name?",
        options: ["2total", "total-price", "total_price"],
        answer: 2,
        why: "A name cannot begin with a digit or contain a hyphen; underscores are allowed.",
      },
      {
        q: "Are `user_name` and `User_Name` the same variable?",
        options: ["Yes", "No, Python is case-sensitive", "Only on Windows"],
        answer: 1,
        why: "Uppercase and lowercase letters are different in Python identifiers.",
      },
    ],
  },
  {
    id: "v3-03",
    number: "03",
    title: "Numbers and calculations",
    intro:
      "Work with integers and decimals, understand division, and calculate useful real-world totals.",
    example:
      'subtotal = 3 * 12.50\ntax = subtotal * 0.08\ntotal = subtotal + tax\nprint(f"Total: ${total:.2f}")',
    sections: [
      {
        heading: "Numbers have different types",
        body: "`int` represents whole numbers and `float` represents decimal numbers. Arithmetic follows familiar precedence rules: multiplication happens before addition unless parentheses change the order.",
        code: "print(2 + 3 * 4)      # 14\nprint((2 + 3) * 4)    # 20\nprint(type(8), type(8.0))",
      },
      {
        heading: "Division operators",
        body: "`/` returns a decimal result. `//` gives a floor-division result, `%` gives the remainder, and `**` raises a number to a power. These operators are useful for grouping and repeating patterns.",
        code: "print(17 / 5)   # 3.4\nprint(17 // 5)  # 3\nprint(17 % 5)   # 2\nprint(2 ** 5)   # 32",
      },
      {
        heading: "Format money for people",
        body: "Floating-point numbers are excellent for many measurements, but their binary representation can show tiny rounding surprises. For beginner display examples, format to two decimal places. Financial applications generally use `decimal.Decimal` for exact decimal arithmetic.",
        code: 'price = 19.9\nprint(f"Price: ${price:.2f}")\nprint(round(10 / 3, 2))',
      },
    ],
    exercises: [
      {
        title: "Split a bill",
        task: "Calculate a 15% tip on a 42.80 bill and the total per person when three people split it.",
        starter: "bill = 42.80\n",
        hint: "Tip is bill multiplied by 0.15; divide the final total by 3.",
        solution:
          'bill = 42.80\ntip = bill * 0.15\ntotal = bill + tip\nper_person = total / 3\nprint(f"Each person pays: ${per_person:.2f}")',
      },
      {
        title: "Convert minutes",
        task: "Convert 137 minutes into whole hours and leftover minutes using // and %.",
        starter: "minutes = 137\n",
        hint: "There are 60 minutes in one hour.",
        solution:
          'minutes = 137\nhours = minutes // 60\nleftover = minutes % 60\nprint(f"{hours} hours and {leftover} minutes")',
      },
      {
        title: "Design a rectangle calculator",
        task: "Calculate and display the area and perimeter of a rectangle 8.5 units wide and 4 units tall.",
        starter: "width = 8.5\nheight = 4\n",
        hint: "Area = width × height; perimeter = 2 × (width + height).",
        solution:
          "width = 8.5\nheight = 4\narea = width * height\nperimeter = 2 * (width + height)\nprint(area, perimeter)",
      },
    ],
    quizzes: [
      {
        q: "What is the result of `17 // 5`?",
        options: ["3", "3.4", "2"],
        answer: 0,
        why: "Floor division discards the fractional portion for these positive numbers.",
      },
      {
        q: "What does `17 % 5` return?",
        options: ["3", "2", "3.4"],
        answer: 1,
        why: "Five fits into seventeen three times with two left over.",
      },
      {
        q: "Which expression groups addition before multiplication?",
        options: ["2 + 3 * 4", "(2 + 3) * 4", "2 + (3 * 4)"],
        answer: 1,
        why: "Parentheses explicitly make Python evaluate 2 + 3 first.",
      },
    ],
  },
  {
    id: "v3-04",
    number: "04",
    title: "Strings and text",
    intro:
      "Clean, combine, search, and format text with the string tools used in everyday applications.",
    example:
      'first = "  ada "\nlast = "lovelace"\nfull_name = f"{first.strip().title()} {last.title()}"\nprint(full_name)',
    sections: [
      {
        heading: "Strings are sequences of characters",
        body: "Text can use single or double quotes. Use the other quote style inside a string, or escape a quote with a backslash. Strings are immutable: methods return new strings rather than changing the original.",
        code: 'message = "Python\'s strings are useful"\nphrase = "hello" + " " + "there"\nprint(phrase.upper())\nprint(message)',
      },
      {
        heading: "Normalize user text",
        body: "`.strip()` removes leading and trailing whitespace. `.lower()` and `.casefold()` help with case-insensitive comparisons; `.title()` is for display, not a universal name-formatting rule. `.replace()` creates a changed copy.",
        code: 'email = "  STUDENT@example.com  "\nclean_email = email.strip().lower()\nprint(clean_email)\nprint("banana".replace("a", "o"))',
      },
      {
        heading: "Use f-strings for readable output",
        body: "An f-string evaluates expressions inside braces and makes output templates easy to read. Use `len()` for length, `in` to check for a substring, and indexing to access characters. The last index is one less than the string length.",
        code: 'product = "notebook"\nquantity = 3\nprint(f"You ordered {quantity} {product}s.")\nprint("book" in product)\nprint(product[0], product[-1])',
      },
      {
        heading: "Slice text with start, stop, and step",
        body: "Strings are sequences, so `text[start:stop:step]` selects a portion without changing the original. The start position is included, the stop is excluded, and an omitted boundary means the beginning or end. Negative positions count from the end. Slicing past a boundary is safe and clips to available text.",
        code: 'course = "PYTHON"\nprint(course[1:4])   # YTH: indexes 1, 2, 3\nprint(course[:2])    # PY: from the beginning\nprint(course[-3:])   # HON: final three characters\nprint(course[::2])   # PTO: every second character\nprint(course[::-1])  # NOHTYP: reversed copy',
      },
      {
        heading: "Use slices to inspect or transform text",
        body: "Slices are useful for extracting prefixes, suffixes, and regular samples, or for reversing text. A slice that selects nothing returns an empty string. Unlike list slices, string slices cannot be assigned into because strings are immutable; build a new string instead.",
        code: 'text = "computer"\nprefix = text[:3]\nsuffix = text[-3:]\nwithout_ends = text[1:-1]\nreversed_text = text[::-1]\nprint(prefix, suffix, without_ends)\nprint(reversed_text)\nprint(text[20:])  # "" rather than IndexError',
      },
    ],
    exercises: [
      {
        title: "Clean a username",
        task: "Trim extra spaces from the provided name, convert it to lowercase, and print its character count.",
        starter: 'raw_name = "  SAM Lee  "\n',
        hint: "Chain `.strip()` and `.lower()`, then use len().",
        solution:
          'raw_name = "  SAM Lee  "\nusername = raw_name.strip().lower()\nprint(username)\nprint(len(username))',
      },
      {
        title: "Create a greeting",
        task: "Use first_name and city variables to print: `Hello, Noor from Amman!`.",
        starter: 'first_name = "Noor"\ncity = "Amman"\n',
        hint: "Put an f before the opening quote and place variable names in braces.",
        solution:
          'first_name = "Noor"\ncity = "Amman"\nprint(f"Hello, {first_name} from {city}!")',
      },
      {
        title: "Check a message",
        task: "Check whether a message contains `urgent` without caring about uppercase/lowercase.",
        starter: 'message = "URGENT: please call"\n',
        hint: "Normalize the message before using `in`.",
        solution:
          'message = "URGENT: please call"\nprint("urgent" in message.casefold())',
      },
    ],
    quizzes: [
      {
        q: "Does `.strip()` remove spaces from both ends of a string?",
        options: ["Yes", "No, only the middle", "It removes every letter"],
        answer: 0,
        why: "strip() returns a copy with leading and trailing whitespace removed.",
      },
      {
        q: "What is the index of the last character in `word`?",
        options: ["len(word)", "len(word) - 1", "1"],
        answer: 1,
        why: "Python indexing begins at zero, so the final index is one less than the length.",
      },
      {
        q: 'What does `"py" in "python"` evaluate to?',
        options: ["True", "False", "2"],
        answer: 0,
        why: "The substring `py` occurs at the beginning of `python`.",
      },
    ],
  },
  {
    id: "v3-05",
    number: "05",
    title: "Input, conversion, and validation",
    intro:
      "Collect information, convert it to the right type, and respond clearly when input is invalid.",
    example:
      'name = input("Name: ").strip()\nage_text = input("Age: ").strip()\nif age_text.isdigit():\n    age = int(age_text)\n    print(f"Hello {name}; next year you will be {age + 1}.")\nelse:\n    print("Please enter your age as a whole number.")',
    sections: [
      {
        heading: "input() returns text",
        body: "Even if a person types digits, `input()` returns a string. Convert integer input with `int()` and decimal input with `float()` before doing arithmetic. Conversion can fail, so validate or handle errors.",
        code: 'quantity_text = input("Quantity: ")\nquantity = int(quantity_text)\nprint("In stock after order:", 20 - quantity)',
      },
      {
        heading: "Validate before using a value",
        body: "Validation checks whether data meets your program's requirements. `.isdigit()` accepts strings of digits, but not negative values or decimals; a try/except block is more flexible for real numeric input.",
        code: 'raw_age = input("Age: ").strip()\nif raw_age.isdigit():\n    age = int(raw_age)\n    print("Age:", age)\nelse:\n    print("Enter digits for age.")',
      },
      {
        heading: "Make prompts and output helpful",
        body: "Tell users what format you expect and give them a useful error message. Avoid silently guessing when input is invalid. The next lesson introduces exceptions, which are the robust way to handle conversion failures.",
        callout:
          "Try each program with normal input, empty input, unexpected text, and boundary values.",
      },
    ],
    exercises: [
      {
        title: "Age in months",
        task: "Ask for an age in whole years and print the approximate number of months. Handle non-number input.",
        starter:
          'age_text = input("Age in years: ").strip()\n# Convert safely and display months\n',
        hint: "Wrap int(age_text) in try/except ValueError.",
        solution:
          'age_text = input("Age in years: ").strip()\ntry:\n    age = int(age_text)\n    if age < 0:\n        print("Age cannot be negative.")\n    else:\n        print("Approximate months:", age * 12)\nexcept ValueError:\n    print("Please enter a whole number.")',
      },
      {
        title: "Temperature converter",
        task: "Ask for Celsius and display Fahrenheit using F = C × 9/5 + 32.",
        starter:
          'celsius_text = input("Temperature in C: ")\n# Convert and calculate\n',
        hint: "Use float() inside a try block.",
        solution:
          'celsius_text = input("Temperature in C: ")\ntry:\n    celsius = float(celsius_text)\n    fahrenheit = celsius * 9 / 5 + 32\n    print(f"{fahrenheit:.1f} F")\nexcept ValueError:\n    print("Please enter a number such as 21.5.")',
      },
      {
        title: "Order total with input",
        task: "Ask for a quantity and a price, then display the total to two decimal places.",
        starter:
          'quantity_text = input("Quantity: ")\nprice_text = input("Price: ")\n',
        hint: "Convert quantity to int, price to float, and reject negative values.",
        solution:
          'try:\n    quantity = int(input("Quantity: "))\n    price = float(input("Price: "))\n    if quantity < 0 or price < 0:\n        print("Values cannot be negative.")\n    else:\n        print(f"Total: ${quantity * price:.2f}")\nexcept ValueError:\n    print("Enter a whole quantity and a numeric price.")',
      },
    ],
    quizzes: [
      {
        q: "What type does input() return?",
        options: ["Always int", "Always str", "It guesses from the input"],
        answer: 1,
        why: "input() returns text; convert it explicitly when you need a number.",
      },
      {
        q: 'What may happen when `int("hello")` runs?',
        options: [
          "It returns zero",
          "It raises ValueError",
          "It returns hello",
        ],
        answer: 1,
        why: "The text cannot be interpreted as an integer, so conversion raises ValueError.",
      },
      {
        q: "Why validate user input?",
        options: [
          "To make the program's assumptions explicit and handle bad data",
          "To make all input a string",
          "To avoid using variables",
        ],
        answer: 0,
        why: "Validation checks requirements and lets a program give a clear response to unsuitable input.",
      },
    ],
  },
  {
    id: "v3-06",
    number: "06",
    title: "Decisions and Boolean logic",
    intro:
      "Use conditions to create branching behavior and combine rules clearly.",
    example:
      'score = 84\nattendance = 92\nif score >= 90:\n    result = "Excellent"\nelif score >= 60 and attendance >= 75:\n    result = "Passed"\nelse:\n    result = "Needs more practice"\nprint(result)',
    sections: [
      {
        heading: "if, elif, and else",
        body: "An `if` statement runs its indented block when its condition is true. `elif` checks another condition only if earlier ones were false. `else` catches the remaining cases. Conditions end with a colon; indentation defines each block.",
        code: 'temperature = 29\nif temperature > 30:\n    print("Hot")\nelif temperature > 20:\n    print("Comfortable")\nelse:\n    print("Cool")',
      },
      {
        heading: "Combine conditions",
        body: "`and` requires both conditions to be true; `or` requires at least one; `not` reverses a Boolean. Comparisons include `==`, `!=`, `<`, `<=`, `>`, and `>=`. Use parentheses when they make a mixed rule easier to understand.",
        code: 'age = 20\nhas_ticket = True\nif age >= 18 and has_ticket:\n    print("Entry allowed")',
      },
      {
        heading: "Order rules carefully",
        body: "Python chooses the first matching branch. Put specific or higher-threshold conditions first. When a condition becomes complicated, name meaningful parts with Boolean variables so the rule is understandable.",
        callout: "Use `==` to compare values; a single `=` assigns a value.",
      },
    ],
    exercises: [
      {
        title: "Grade label",
        task: "Convert a score from 0 to 100 into A (90+), B (80+), C (70+), or Needs work. Reject out-of-range scores.",
        starter: "score = 76\n",
        hint: "Check the highest threshold first, then the lower thresholds.",
        solution:
          'score = 76\nif not 0 <= score <= 100:\n    print("Score must be from 0 to 100.")\nelif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelse:\n    print("Needs work")',
      },
      {
        title: "Shipping eligibility",
        task: "Offer free shipping when the order is at least 50 or the customer is a member.",
        starter: "order_total = 42\nis_member = False\n",
        hint: "This rule needs `or`.",
        solution:
          'order_total = 42\nis_member = False\nif order_total >= 50 or is_member:\n    print("Free shipping")\nelse:\n    print("Shipping fee applies")',
      },
      {
        title: "Leap year rule",
        task: "Use the Gregorian leap-year rules: divisible by 4, except centuries unless divisible by 400.",
        starter: "year = 2000\n",
        hint: "Combine `%` divisibility checks with and/or and parentheses.",
        solution:
          'year = 2000\nis_leap = year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)\nprint("Leap year" if is_leap else "Common year")',
      },
    ],
    quizzes: [
      {
        q: "When does an `else` block run?",
        options: [
          "Every time",
          "When no preceding if/elif condition matched",
          "Only if the first condition is true",
        ],
        answer: 1,
        why: "else is the fallback branch for cases where earlier conditions were false.",
      },
      {
        q: "What does `and` require?",
        options: [
          "At least one condition is true",
          "Both conditions are true",
          "Both conditions are false",
        ],
        answer: 1,
        why: "An `and` expression is true only when every operand is true.",
      },
      {
        q: "Why put `score >= 90` before `score >= 60`?",
        options: [
          "The more specific higher threshold must be checked first",
          "Python cannot compare 90 and 60",
          "It makes score a string",
        ],
        answer: 0,
        why: "A score of 95 also meets the lower threshold, so check the higher grade first.",
      },
    ],
  },
  {
    id: "v3-07",
    number: "07",
    title: "Loops and repetition",
    intro:
      "Automate repeated work with for and while loops, ranges, and careful stopping conditions.",
    example:
      'total = 0\nfor price in [4.5, 2.0, 7.25]:\n    total += price\nprint(f"Total: ${total:.2f}")',
    sections: [
      {
        heading: "Repeat once for every item",
        body: "A `for` loop visits each item in an iterable. The indented body runs once per item. Give the loop variable a name that explains the current item.",
        code: 'for name in ["Ari", "Mina", "Jo"]:\n    print(f"Hello, {name}!")',
      },
      {
        heading: "Use range() for counting",
        body: "`range(stop)` starts at zero and stops before `stop`. `range(start, stop, step)` lets you choose a start and step. Convert it to a list to inspect its values.",
        code: "for number in range(1, 6):\n    print(number)\n\nprint(list(range(2, 11, 2)))",
      },
      {
        heading: "Build nested loops one level at a time",
        body: "A nested loop places one loop inside another. For every outer iteration, the inner loop completes all of its iterations. In the first example, two rows each print three coordinates; the inner loop's variables change faster than the outer loop's variable. Indentation shows which loop owns each statement.",
        code: 'for row in range(2):\n    for column in range(3):\n        print(f"({row}, {column})", end=" ")\n    print()\n\n# Output:\n# (0, 0) (0, 1) (0, 2)\n# (1, 0) (1, 1) (1, 2)',
      },
      {
        heading: "Draw triangles and pyramids with stars",
        body: "Patterns are a visual way to trace nested loops. Let the outer loop choose the row, then let an inner loop print the characters for that row. For an increasing triangle, row r contains r stars. For a centered pyramid, print height - r spaces and then 2 × r - 1 stars. The newline belongs after the inner loops so each row stays together.",
        code: 'height = 4\nprint("Increasing triangle:")\nfor row in range(1, height + 1):\n    for star in range(row):\n        print("*", end="")\n    print()\n\nprint("Centered pyramid:")\nfor row in range(1, height + 1):\n    for space in range(height - row):\n        print(" ", end="")\n    for star in range(2 * row - 1):\n        print("*", end="")\n    print()',
      },
      {
        heading: "Draw checkerboards and hollow rectangles",
        body: "A nested loop can also decide what character belongs in each grid cell. For an alternating checkerboard, row + column parity determines the symbol. For a hollow rectangle, print a border character when a cell is on the first or last row or column; print a space inside. Test small dimensions such as one row or one column because border conditions can overlap.",
        code: 'rows = 4\ncolumns = 6\nprint("Checkerboard:")\nfor row in range(rows):\n    for column in range(columns):\n        symbol = "*" if (row + column) % 2 == 0 else "."\n        print(symbol, end=" ")\n    print()\n\nprint("Hollow rectangle:")\nfor row in range(4):\n    for column in range(7):\n        on_border = row in (0, 3) or column in (0, 6)\n        print("*" if on_border else " ", end="")\n    print()',
      },
      {
        heading: "Use nested loops for grids and combinations",
        body: "Nested loops are useful when each value in one group must be paired with every value in another, or when visiting every row-and-column cell. With 3 rows and 4 columns, the inner body runs 3 × 4 = 12 times. If a pair should be visited only once, choose the inner range carefully rather than doing duplicate work. You can also build a row as text and print it once, which is often clearer than printing each cell separately.",
        code: 'for number in range(1, 4):\n    for multiplier in range(1, 5):\n        print(f"{number} x {multiplier} = {number * multiplier}")\n    print("--- end of row ---")',
      },
      {
        heading: "Use while when repetition depends on a condition",
        body: "A `while` loop continues as long as its condition is true. Make progress toward a stopping condition on every intended iteration. `break` exits the nearest enclosing loop; `continue` skips the rest of the current iteration. A loop's `else` block runs only when the loop finishes without `break`, which is useful for search results.",
        code: 'target = "Jo"\nfor name in ["Ari", "Mina", "Jo"]:\n    if name == target:\n        print("Found", target)\n        break\nelse:\n    print("Not found")\n\nattempts = 0\nwhile attempts < 3:\n    attempts += 1\n    if attempts == 2:\n        continue\n    print("Attempt", attempts)',
      },
    ],
    exercises: [
      {
        title: "Draw an increasing star triangle",
        task: "Use nested loops to print five rows of stars: one star on the first row, two on the second, and so on.",
        starter: "height = 5\n",
        hint: "For each row number, print that many stars in the inner loop, then print a newline.",
        solution:
          'height = 5\nfor row in range(1, height + 1):\n    for star in range(row):\n        print("*", end="")\n    print()',
      },
      {
        title: "Draw a centered pyramid",
        task: "Use nested loops to print a centered pyramid of stars with five rows.",
        starter: "height = 5\n",
        hint: "For row r, print height-r spaces followed by 2*r-1 stars. Use one loop for spaces and another for stars inside the outer row loop.",
        solution:
          'height = 5\nfor row in range(1, height + 1):\n    for space in range(height - row):\n        print(" ", end="")\n    for star in range(2 * row - 1):\n        print("*", end="")\n    print()',
      },
      {
        title: "Draw a checkerboard",
        task: "Print a 6-by-8 checkerboard pattern using nested loops and alternate X and . on every cell.",
        starter: "rows = 6\ncolumns = 8\n",
        hint: "A cell is X when (row + column) % 2 == 0; otherwise print a dot. Keep the newline outside the inner loop.",
        solution:
          'rows = 6\ncolumns = 8\nfor row in range(rows):\n    for column in range(columns):\n        if (row + column) % 2 == 0:\n            print("X", end=" ")\n        else:\n            print(".", end=" ")\n    print()',
      },
    ],
    quizzes: [
      {
        q: "What values does `range(2, 5)` produce?",
        options: ["2, 3, 4", "2, 3, 4, 5", "1, 2, 3, 4"],
        answer: 0,
        why: "The start is included and the stop value is excluded.",
      },
      {
        q: "What is a common cause of an infinite while loop?",
        options: [
          "The loop condition never becomes false",
          "The body has a print() call",
          "A variable has a descriptive name",
        ],
        answer: 0,
        why: "If nothing changes the values that determine the condition, it may remain true forever.",
      },
      {
        q: "Which loop is a natural fit for visiting every item in a list?",
        options: ["for", "while True", "if"],
        answer: 0,
        why: "A for loop directly iterates over each list item.",
      },
    ],
  },
  {
    id: "v3-08",
    number: "08",
    title: "Lists and sequences",
    intro:
      "Store ordered collections, access positions safely, and transform lists with loops and methods.",
    example:
      'tasks = ["read", "practice", "review"]\ntasks.append("rest")\nfor position, task in enumerate(tasks, start=1):\n    print(f"{position}. {task}")',
    sections: [
      {
        heading: "Create, read, and update lists",
        body: "Lists are ordered and mutable. Indexing begins at zero; negative indexes count from the end. Use `len()` to check size before indexing when the list may be empty.",
        code: 'colors = ["blue", "green", "gold"]\nprint(colors[0], colors[-1])\ncolors[1] = "teal"\nprint(len(colors), colors)',
      },
      {
        heading: "Add and remove items",
        body: "`append()` adds one item at the end; `extend()` adds items from another iterable; `insert()` adds at an index. `remove()` deletes the first matching value; `pop()` removes and returns an item.",
        code: 'scores = [70, 85]\nscores.append(90)\nscores.extend([76, 88])\nremoved = scores.pop()\nprint(scores, "removed:", removed)',
      },
      {
        heading: "Loop and slice",
        body: "Loop over values directly when you need values. Use `enumerate()` when you need both a position and a value. A list slice `items[start:stop:step]` creates a new outer list with part of the sequence: start is included, stop is excluded, and a negative step walks backward. Slices also work on strings and tuples. Slicing beyond a boundary is safe; indexing beyond it is not.",
        code: 'cities = ["Rabat", "Cairo", "Amman", "Tunis", "Doha"]\nfor number, city in enumerate(cities, start=1):\n    print(number, city)\nprint(cities[1:4])    # ["Cairo", "Amman", "Tunis"]\nprint(cities[:2])     # first two\nprint(cities[-2:])    # last two\nprint(cities[::2])    # every second city\nprint(cities[::-1])   # reversed copy\nprint(cities[20:])    # []',
      },
      {
        heading: "Replace, delete, and copy list slices",
        body: "Assigning to a list slice changes the list in place. A plain slice replacement may contain a different number of values and can grow or shrink the list. `del items[start:stop]` removes a selected range. A slice copy is shallow: it creates a new outer list, but nested lists or other mutable objects are still shared.",
        code: 'scores = [60, 70, 80, 90]\nscores[1:3] = [75, 85, 95]\nprint(scores)  # [60, 75, 85, 95, 90]\ndel scores[:1]\nprint(scores)  # [75, 85, 95, 90]\n\noriginal = [[1], [2]]\nshallow_copy = original[:]\nshallow_copy[0].append(99)\nprint(original)  # [[1, 99], [2]]',
      },
    ],
    exercises: [
      {
        title: "Score report",
        task: "Calculate the count, lowest score, highest score, and average for the list.",
        starter: "scores = [82, 91, 67, 88, 95]\n",
        hint: "Use len(), min(), max(), and sum(scores) / len(scores).",
        solution:
          'scores = [82, 91, 67, 88, 95]\nprint("Count:", len(scores))\nprint("Lowest:", min(scores))\nprint("Highest:", max(scores))\nprint("Average:", sum(scores) / len(scores))',
      },
      {
        title: "Shopping list manager",
        task: "Add `milk`, remove `bread`, then display the final shopping list.",
        starter: 'shopping = ["bread", "apples", "rice"]\n',
        hint: "Use append() and remove().",
        solution:
          'shopping = ["bread", "apples", "rice"]\nshopping.append("milk")\nshopping.remove("bread")\nprint(shopping)',
      },
      {
        title: "Filter passing scores",
        task: "Build a new list containing only scores that are at least 60.",
        starter: "scores = [45, 80, 59, 92, 60]\npassing = []\n",
        hint: "Loop over scores, test each one, and append passing values.",
        solution:
          "scores = [45, 80, 59, 92, 60]\npassing = []\nfor score in scores:\n    if score >= 60:\n        passing.append(score)\nprint(passing)",
      },
    ],
    quizzes: [
      {
        q: "What is the index of the first list item?",
        options: ["0", "1", "-1"],
        answer: 0,
        why: "Python sequences use zero-based indexing.",
      },
      {
        q: "What does `append(value)` do?",
        options: [
          "Adds value to the end of the list",
          "Sorts the list",
          "Removes the last value",
        ],
        answer: 0,
        why: "append() places one new item at the end of the list.",
      },
      {
        q: "What happens when you index an empty list?",
        options: ["You get None", "You get IndexError", "It creates an item"],
        answer: 1,
        why: "There is no valid position in an empty list, so indexing raises IndexError.",
      },
    ],
  },
  {
    id: "v3-09",
    number: "09",
    title: "Tuples, sets, and choosing collections",
    intro:
      "Choose the right collection for fixed records, unique items, and fast membership checks.",
    example:
      'attendees = ["Mina", "Omar", "Mina", "Ari"]\nunique_attendees = set(attendees)\nprint("Unique:", unique_attendees)\nprint("Omar registered:", "Omar" in unique_attendees)',
    sections: [
      {
        heading: "Tuples represent fixed groups",
        body: "A tuple is ordered and immutable. It is useful for a fixed record such as coordinates or a returned pair of values. A one-item tuple needs a trailing comma.",
        code: 'point = (4, 7)\nx, y = point\nsingle_value = ("only item",)\nprint(x, y, single_value)',
      },
      {
        heading: "Sets contain unique values",
        body: "A set stores unique hashable values and supports fast membership tests. Sets have no positional indexing and should not be used when display order matters. An empty set is `set()`, because `{}` creates a dictionary.",
        code: 'tags = {"python", "beginner", "python"}\ntags.add("practice")\nprint(tags)\nprint("python" in tags)',
      },
      {
        heading: "Compare and combine sets",
        body: "Set operations express relationships clearly: `&` is intersection, `|` is union, and `-` is difference. Use them for overlapping categories, unique IDs, or removing duplicates when order is unimportant.",
        code: 'morning = {"Ari", "Mina"}\nafternoon = {"Mina", "Omar"}\nprint(morning & afternoon)\nprint(morning | afternoon)\nprint(morning - afternoon)',
      },
    ],
    exercises: [
      {
        title: "Remove duplicate tags",
        task: "Convert the list to a set, add `loops`, and report whether `python` is present.",
        starter:
          'tags = ["python", "lists", "python", "strings"]\n# Convert, add, and check\n',
        hint: "Build a set from the list, then use add() and `in`.",
        solution:
          'tags = ["python", "lists", "python", "strings"]\nunique_tags = set(tags)\nunique_tags.add("loops")\nprint(unique_tags)\nprint("python" in unique_tags)',
      },
      {
        title: "Compare course groups",
        task: "Find students in both groups, all unique students, and students only in group A.",
        starter:
          'group_a = {"Ari", "Mina", "Jo"}\ngroup_b = {"Mina", "Omar"}\n',
        hint: "Use set intersection, union, and difference.",
        solution:
          'group_a = {"Ari", "Mina", "Jo"}\ngroup_b = {"Mina", "Omar"}\nprint("Both:", group_a & group_b)\nprint("All:", group_a | group_b)\nprint("Only A:", group_a - group_b)',
      },
      {
        title: "Unpack coordinates",
        task: "Unpack a tuple of (x, y), then print its distance squared from the origin.",
        starter: "point = (3, 4)\n",
        hint: "Unpack into x and y; compute x**2 + y**2.",
        solution:
          "point = (3, 4)\nx, y = point\ndistance_squared = x**2 + y**2\nprint(distance_squared)",
      },
    ],
    quizzes: [
      {
        q: "Which collection is immutable and ordered?",
        options: ["list", "tuple", "set"],
        answer: 1,
        why: "Tuples preserve order and cannot be changed after creation.",
      },
      {
        q: "How do you create an empty set?",
        options: ["{}", "set()", "[]"],
        answer: 1,
        why: "{} creates an empty dictionary; set() creates an empty set.",
      },
      {
        q: "Which set operation returns values shared by both sets?",
        options: ["Union", "Intersection", "Difference"],
        answer: 1,
        why: "Intersection contains items found in both sets.",
      },
    ],
  },
  {
    id: "v3-10",
    number: "10",
    title: "Dictionaries and structured data",
    intro:
      "Represent records with named fields, safely retrieve values, and process key-value data.",
    example:
      'student = {"name": "Rami", "score": 88, "active": True}\nstudent["score"] += 4\nfor key, value in student.items():\n    print(f"{key}: {value}")',
    sections: [
      {
        heading: "Map keys to values",
        body: "A dictionary maps unique, hashable keys to values. Keys act like labels, making records more expressive than relying on numeric positions. Use square brackets to read or assign a known key.",
        code: 'book = {"title": "Small Steps", "pages": 180}\nprint(book["title"])\nbook["pages"] = 192\nbook["available"] = True',
      },
      {
        heading: "Handle missing keys safely",
        body: "Indexing a missing key raises KeyError. `.get(key, default)` returns a default if the key is absent. Use the `in` operator to distinguish missing fields before making decisions.",
        code: 'profile = {"name": "Noor"}\nprint(profile.get("city", "Not provided"))\nif "city" in profile:\n    print(profile["city"])',
      },
      {
        heading: "Loop over records",
        body: "Use `.keys()`, `.values()`, or `.items()` to iterate over dictionary contents. A list of dictionaries is a common way to represent several records before learning about databases.",
        code: 'scores = {"Mina": 91, "Omar": 84}\nfor name, score in scores.items():\n    print(f"{name}: {score}")',
      },
    ],
    exercises: [
      {
        title: "Build a product record",
        task: "Create a product dictionary with name, price, and quantity, then display its inventory value.",
        starter: "# Create a product dictionary\n",
        hint: "Inventory value is price multiplied by quantity.",
        solution:
          'product = {"name": "Notebook", "price": 4.5, "quantity": 12}\nvalue = product["price"] * product["quantity"]\nprint(product["name"], value)',
      },
      {
        title: "Count words",
        task: "Count how many times each word appears in the sentence.",
        starter: 'sentence = "red blue red green blue red"\ncounts = {}\n',
        hint: "Loop through split words and increment the dictionary value.",
        solution:
          'sentence = "red blue red green blue red"\ncounts = {}\nfor word in sentence.split():\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)',
      },
      {
        title: "Summarize class results",
        task: "Calculate the average score and print the name of every student whose score is 80 or higher.",
        starter: 'scores = {"Ari": 76, "Mina": 92, "Jo": 81}\n',
        hint: "Use values() for the average and items() to print names and scores.",
        solution:
          'scores = {"Ari": 76, "Mina": 92, "Jo": 81}\naverage = sum(scores.values()) / len(scores)\nprint("Average:", average)\nfor name, score in scores.items():\n    if score >= 80:\n        print(name, score)',
      },
    ],
    quizzes: [
      {
        q: "What does a dictionary key do?",
        options: [
          "Labels and retrieves its associated value",
          "Gives a value a position",
          "Sorts dictionary entries",
        ],
        answer: 0,
        why: "A key identifies the value associated with it in a dictionary.",
      },
      {
        q: "What happens when you read a missing key with `data[key]`?",
        options: ["KeyError", "It always returns zero", "It adds the key"],
        answer: 0,
        why: "Bracket lookup requires the key to exist; use get() for a default.",
      },
      {
        q: "Which method gives key-value pairs for looping?",
        options: ["items()", "values()", "append()"],
        answer: 0,
        why: "items() returns each key and its value together.",
      },
    ],
  },
  {
    id: "v3-11",
    number: "11",
    title: "Functions and reusable code",
    intro:
      "Break problems into named functions with parameters, return values, and clear responsibilities.",
    example:
      'def calculate_total(price, quantity):\n    """Return the cost for a number of items."""\n    return price * quantity\n\nsubtotal = calculate_total(4.5, 3)\nprint(f"Subtotal: ${subtotal:.2f}")',
    sections: [
      {
        heading: "Define, then call",
        body: "A function packages instructions under a name. `def` defines it; the indented body runs when called. Parameters are the function's inputs; arguments are the values passed in a call.",
        code: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Mina")\ngreet("Omar")',
      },
      {
        heading: "Return values to the caller",
        body: "`return` sends a result back so the rest of the program can use it. `print()` only displays a result. A function without an explicit return value returns `None`.",
        code: "def rectangle_area(width, height):\n    return width * height\n\narea = rectangle_area(5, 3)\nprint(area)",
      },
      {
        heading: "Use small functions with clear contracts",
        body: "A useful function has a focused job, clear parameter names, and a predictable result. Default arguments can make optional inputs convenient. Avoid changing unrelated global variables from inside a function.",
        code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Ari"))\nprint(greet("Ari", "Welcome"))',
      },
    ],
    exercises: [
      {
        title: "Reusable tax calculator",
        task: "Write a function that returns price plus a configurable tax rate (default 8%).",
        starter:
          "def price_with_tax(price, tax_rate=0.08):\n    # Return the total\n    pass\n",
        hint: "Multiply price by (1 + tax_rate).",
        solution:
          "def price_with_tax(price, tax_rate=0.08):\n    return price * (1 + tax_rate)\n\nprint(price_with_tax(25))\nprint(price_with_tax(25, 0.1))",
      },
      {
        title: "Find the largest number",
        task: "Write a function that returns the largest of three numeric arguments.",
        starter: "def largest_of_three(a, b, c):\n    pass\n",
        hint: "Python's max() accepts multiple arguments.",
        solution:
          "def largest_of_three(a, b, c):\n    return max(a, b, c)\n\nprint(largest_of_three(4, 12, 9))",
      },
      {
        title: "Clean and format a name",
        task: "Write a function that trims spaces and title-cases a name; demonstrate it with an input that has extra spaces.",
        starter: "def format_name(name):\n    pass\n",
        hint: "Return name.strip().title().",
        solution:
          'def format_name(name):\n    return name.strip().title()\n\nprint(format_name("  maya lovelace  "))',
      },
    ],
    quizzes: [
      {
        q: "What does `return` do?",
        options: [
          "Displays a value on screen",
          "Sends a result back to the caller",
          "Repeats a function",
        ],
        answer: 1,
        why: "A return value can be stored, combined, or passed into another function.",
      },
      {
        q: "What is a parameter?",
        options: [
          "A named input in a function definition",
          "The output window",
          "A loop condition",
        ],
        answer: 0,
        why: "Parameters name the values a function accepts.",
      },
      {
        q: "What does a function return if it reaches its end without `return`?",
        options: ["0", "None", "The function name"],
        answer: 1,
        why: "Python functions implicitly return None when no return value is given.",
      },
    ],
  },
  {
    id: "v3-12",
    number: "12",
    title: "Scope, decomposition, and recursion",
    intro:
      "Understand local variables, decompose larger work, and learn when recursion is appropriate.",
    example:
      'def order_summary(items):\n    subtotal = sum(items)\n    return {"count": len(items), "subtotal": subtotal}\n\nsummary = order_summary([4.5, 2.0, 7.25])\nprint(summary)',
    sections: [
      {
        heading: "Local and global names",
        body: "A variable created inside a function is local to that function. Pass data in through parameters and return results rather than relying on hidden global state. This makes behavior easier to test and reuse.",
        code: "def double(number):\n    result = number * 2\n    return result\n\nprint(double(6))\n# result is local to double()",
      },
      {
        heading: "Split a large job into steps",
        body: "Decomposition means turning a large problem into smaller functions with clear responsibilities. One function can validate input, another calculate a result, and another format output.",
        code: "def subtotal(prices):\n    return sum(prices)\n\ndef with_tax(amount, rate):\n    return amount * (1 + rate)\n\nprint(with_tax(subtotal([5, 8]), 0.08))",
      },
      {
        heading: "Recursion needs a base case",
        body: "A recursive function calls itself on a smaller problem. Its base case stops recursion. Many loops are clearer and safer for simple repetition, but recursion is useful for naturally nested structures.",
        code: 'def countdown(number):\n    if number <= 0:  # base case\n        print("Done")\n        return\n    print(number)\n    countdown(number - 1)',
      },
    ],
    exercises: [
      {
        title: "Compose a full name",
        task: "Write separate clean_name() and make_greeting() functions; call them together.",
        starter:
          "def clean_name(name):\n    pass\n\ndef make_greeting(name):\n    pass\n",
        hint: "Have one function return cleaned text; pass that result to the next.",
        solution:
          'def clean_name(name):\n    return name.strip().title()\n\ndef make_greeting(name):\n    return f"Welcome, {name}!"\n\nprint(make_greeting(clean_name("  ari  ")))',
      },
      {
        title: "Sum with a loop",
        task: "Write a function that accepts a list of numbers and returns their total without using sum().",
        starter: "def total_of(numbers):\n    total = 0\n",
        hint: "Add each number to a local total, then return it.",
        solution:
          "def total_of(numbers):\n    total = 0\n    for number in numbers:\n        total += number\n    return total\n\nprint(total_of([2, 4, 6]))",
      },
      {
        title: "Recursive factorial",
        task: "Write a recursive factorial function for non-negative integers and include the base case.",
        starter: "def factorial(number):\n    pass\n",
        hint: "factorial(0) is 1; otherwise multiply number by factorial(number - 1).",
        solution:
          'def factorial(number):\n    if number < 0:\n        raise ValueError("number must not be negative")\n    if number == 0:\n        return 1\n    return number * factorial(number - 1)\n\nprint(factorial(5))',
      },
    ],
    quizzes: [
      {
        q: "Why pass values into functions as parameters?",
        options: [
          "To make dependencies clear and behavior reusable",
          "To make variables global",
          "To avoid returning values",
        ],
        answer: 0,
        why: "Explicit parameters make a function's inputs clear and easier to test.",
      },
      {
        q: "What stops a recursive function from calling itself forever?",
        options: ["A base case", "A global variable", "A print statement"],
        answer: 0,
        why: "The base case returns without making another recursive call.",
      },
      {
        q: "Which approach is generally easiest to test?",
        options: [
          "A small function that takes inputs and returns a result",
          "A function that modifies many unrelated globals",
          "One enormous function",
        ],
        answer: 0,
        why: "Small functions with explicit inputs and outputs have fewer hidden dependencies.",
      },
    ],
  },
  {
    id: "v3-13",
    number: "13",
    title: "Comprehensions and transformations",
    intro:
      "Transform and filter collections concisely while keeping the logic readable.",
    example:
      "prices = [12, 25, 8, 40]\nwith_tax = [round(price * 1.08, 2) for price in prices]\nlarge_orders = [price for price in prices if price >= 20]\nprint(with_tax)\nprint(large_orders)",
    sections: [
      {
        heading: "Build a list from another iterable",
        body: "A list comprehension creates a new list using an expression and a loop. It is concise for a simple transformation. Use a regular loop when it needs multiple steps or would be difficult to scan.",
        code: "numbers = [1, 2, 3, 4]\nsquares = [number ** 2 for number in numbers]\nprint(squares)",
      },
      {
        heading: "Filter with a condition",
        body: "Add an `if` condition after the loop to keep only matching values. Read the comprehension in the same order as the plain-English description: expression, for each item, if the condition.",
        code: 'words = ["python", "is", "readable"]\nlong_words = [word for word in words if len(word) > 3]\nprint(long_words)',
      },
      {
        heading: "Other comprehension types",
        body: "Dictionary and set comprehensions create those collections with the same pattern. Do not use a comprehension just to perform side effects such as printing; use a clear loop for actions.",
        code: 'names = ["ari", "mina", "jo"]\nlengths = {name: len(name) for name in names}\ninitials = {name[0].upper() for name in names}\nprint(lengths, initials)',
      },
    ],
    exercises: [
      {
        title: "Convert temperatures",
        task: "Create a new list of Fahrenheit values from Celsius readings.",
        starter: "celsius_values = [0, 20, 37, 100]\n",
        hint: "Use `c * 9 / 5 + 32` inside a list comprehension.",
        solution:
          "celsius_values = [0, 20, 37, 100]\nfahrenheit_values = [c * 9 / 5 + 32 for c in celsius_values]\nprint(fahrenheit_values)",
      },
      {
        title: "Filter clean words",
        task: "From the list, create a lowercase list containing only non-empty words longer than three characters.",
        starter: 'words = ["  Python", "", "is", "useful  ", "AI"]\n',
        hint: "Normalize each word and use a condition on its stripped value.",
        solution:
          'words = ["  Python", "", "is", "useful  ", "AI"]\nclean_words = [word.strip().lower() for word in words if len(word.strip()) > 3]\nprint(clean_words)',
      },
      {
        title: "Create a lookup",
        task: "Create a dictionary mapping each word to its length.",
        starter: 'words = ["loops", "functions", "tests"]\n',
        hint: "Use `{word: len(word) for word in words}`.",
        solution:
          'words = ["loops", "functions", "tests"]\nlength_by_word = {word: len(word) for word in words}\nprint(length_by_word)',
      },
    ],
    quizzes: [
      {
        q: "What does `[n * 2 for n in numbers]` create?",
        options: [
          "A new list with each number doubled",
          "A set of numbers",
          "It changes the original list in place",
        ],
        answer: 0,
        why: "A list comprehension evaluates its expression for each source item.",
      },
      {
        q: "Where does the filter condition go in a list comprehension?",
        options: [
          "Before the expression",
          "After the for clause",
          "Outside brackets",
        ],
        answer: 1,
        why: "A filter appears after the for clause, such as `[x for x in xs if x > 0]`.",
      },
      {
        q: "When should a regular loop be preferred?",
        options: [
          "When several steps make a comprehension hard to read",
          "Never",
          "Only when the list is empty",
        ],
        answer: 0,
        why: "Readable, maintainable code is more important than making every expression short.",
      },
    ],
  },
  {
    id: "v3-14",
    number: "14",
    title: "Errors and exception handling",
    intro:
      "Read tracebacks, handle expected failures, and design reliable error messages.",
    example:
      'raw_price = input("Price: ")\ntry:\n    price = float(raw_price)\nexcept ValueError:\n    print("Enter a numeric price, for example 12.50.")\nelse:\n    print(f"Price entered: ${price:.2f}")',
    sections: [
      {
        heading: "Read a traceback from the bottom",
        body: "A traceback shows the path to a failure. The last line names the exception and message; the lines above show where the error occurred. `SyntaxError` prevents code from parsing, while `TypeError`, `ValueError`, `KeyError`, and `IndexError` occur at runtime.",
        code: 'numbers = [10, 20]\n# numbers[5] raises IndexError\n# int("ten") raises ValueError\nprint("Read the exception type first.")',
      },
      {
        heading: "Handle only expected exceptions",
        body: "Put a risky conversion in `try` and catch the specific exception you expect. A broad `except:` can hide programming mistakes and make failures hard to diagnose.",
        code: 'try:\n    quantity = int(input("Quantity: "))\nexcept ValueError:\n    print("Quantity must be a whole number.")\nelse:\n    print("Quantity:", quantity)',
      },
      {
        heading: "Use finally for cleanup",
        body: "`else` runs when the try block succeeds; `finally` runs whether it succeeds or fails. Cleanup such as closing files is usually handled more safely by `with`, which you will use later.",
        code: 'try:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nelse:\n    print(result)\nfinally:\n    print("Calculation finished")',
      },
    ],
    exercises: [
      {
        title: "Safe integer input",
        task: "Ask for a whole number and report its square; show a useful message for invalid input.",
        starter: 'raw = input("Whole number: ")\n',
        hint: "Catch ValueError from int(raw).",
        solution:
          'raw = input("Whole number: ")\ntry:\n    number = int(raw)\nexcept ValueError:\n    print("Please enter a whole number.")\nelse:\n    print("Square:", number ** 2)',
      },
      {
        title: "Safe division",
        task: "Divide numerator by denominator and handle division by zero and non-numeric data.",
        starter:
          'numerator = input("Numerator: ")\ndenominator = input("Denominator: ")\n',
        hint: "Convert both values, and catch ValueError and ZeroDivisionError separately or together.",
        solution:
          'numerator = input("Numerator: ")\ndenominator = input("Denominator: ")\ntry:\n    result = float(numerator) / float(denominator)\nexcept ValueError:\n    print("Enter valid numbers.")\nexcept ZeroDivisionError:\n    print("The denominator cannot be zero.")\nelse:\n    print("Result:", result)',
      },
      {
        title: "Safe dictionary lookup",
        task: "Read the language for a known name, but display `Unknown student` if the name is absent.",
        starter:
          'languages = {"Mina": "Python", "Omar": "Java"}\nname = "Jo"\n',
        hint: "Use get() or check whether name exists with `in`.",
        solution:
          'languages = {"Mina": "Python", "Omar": "Java"}\nname = "Jo"\nprint(languages.get(name, "Unknown student"))',
      },
    ],
    quizzes: [
      {
        q: 'Which exception is raised by `int("blue")`?',
        options: ["ValueError", "IndexError", "NameError"],
        answer: 0,
        why: "The value cannot be converted to an integer.",
      },
      {
        q: "Why avoid a bare `except:`?",
        options: [
          "It can hide unexpected programming errors",
          "It catches no errors",
          "It prevents Python from running",
        ],
        answer: 0,
        why: "Catch expected exception types so unrelated bugs remain visible.",
      },
      {
        q: "When does an `else` block after `try/except` run?",
        options: [
          "When the try block raises",
          "When the try block succeeds",
          "Before try",
        ],
        answer: 1,
        why: "The try-else block runs only when no exception was raised in try.",
      },
    ],
  },
  {
    id: "v3-15",
    number: "15",
    title: "Files and persistent data",
    intro:
      "Read and write files safely with context managers and understand paths and encodings.",
    example:
      'from pathlib import Path\n\nnotes_path = Path("notes.txt")\nnotes_path.write_text("Practice Python daily.\\n", encoding="utf-8")\ntext = notes_path.read_text(encoding="utf-8")\nprint(text)',
    sections: [
      {
        heading: "Use pathlib for paths",
        body: "`pathlib.Path` represents filesystem paths and offers clear methods for reading, writing, and joining paths. Relative paths are resolved from the program's current working directory, which may differ from the script's folder.",
        code: 'from pathlib import Path\n\nfolder = Path("data")\nfile_path = folder / "notes.txt"\nprint(file_path)',
      },
      {
        heading: "Use a context manager for files",
        body: 'The `with` statement closes a file even if an error occurs. Specify `encoding="utf-8"` for portable text. Write mode replaces existing content; append mode adds to the end.',
        code: 'from pathlib import Path\n\npath = Path("journal.txt")\nwith path.open("w", encoding="utf-8") as file:\n    file.write("First note\\n")\nwith path.open("a", encoding="utf-8") as file:\n    file.write("Another note\\n")',
      },
      {
        heading: "Check before reading",
        body: "A missing path raises `FileNotFoundError`. Check whether a path exists when that changes the user experience, or handle the expected exception. Avoid assuming that a file will always be present.",
        code: 'from pathlib import Path\n\npath = Path("settings.txt")\nif path.exists():\n    print(path.read_text(encoding="utf-8"))\nelse:\n    print("No settings file yet.")',
      },
    ],
    exercises: [
      {
        title: "Write and read a journal",
        task: "Write a two-line note to `practice.txt`, then read and print it.",
        starter: 'from pathlib import Path\n\npath = Path("practice.txt")\n',
        hint: "Use write_text() and read_text() with UTF-8.",
        solution:
          'from pathlib import Path\n\npath = Path("practice.txt")\npath.write_text("Today I learned loops.\\nTomorrow I will practice.\\n", encoding="utf-8")\nprint(path.read_text(encoding="utf-8"))',
      },
      {
        title: "Append a new task",
        task: "Append `Review functions` to a task file without deleting existing content.",
        starter: 'from pathlib import Path\n\ntask_path = Path("tasks.txt")\n',
        hint: "Use open() in append mode (`a`) and a with block.",
        solution:
          'from pathlib import Path\n\ntask_path = Path("tasks.txt")\nwith task_path.open("a", encoding="utf-8") as file:\n    file.write("Review functions\\n")',
      },
      {
        title: "Handle a missing file",
        task: "Try to read `welcome.txt`; print its contents or a friendly message if it does not exist.",
        starter: 'from pathlib import Path\n\npath = Path("welcome.txt")\n',
        hint: "Catch FileNotFoundError around read_text().",
        solution:
          'from pathlib import Path\n\npath = Path("welcome.txt")\ntry:\n    print(path.read_text(encoding="utf-8"))\nexcept FileNotFoundError:\n    print("Welcome file has not been created yet.")',
      },
    ],
    quizzes: [
      {
        q: "Why use `with path.open(...) as file`?",
        options: [
          "It ensures the file is closed after the block",
          "It changes text into a number",
          "It prevents all file errors",
        ],
        answer: 0,
        why: "A context manager manages cleanup and closes the file when the block ends.",
      },
      {
        q: 'What does write mode (`"w"`) normally do to an existing file?',
        options: ["Appends only", "Replaces its contents", "Reads it"],
        answer: 1,
        why: "Write mode truncates an existing file; use append mode to add to it.",
      },
      {
        q: "Why specify UTF-8 for text files?",
        options: [
          "It provides a consistent text encoding across systems",
          "It makes every file binary",
          "It makes paths absolute",
        ],
        answer: 0,
        why: "An explicit encoding helps interpret text consistently across environments.",
      },
    ],
  },
  {
    id: "v3-16",
    number: "16",
    title: "Modules, imports, and packages",
    intro:
      "Organize programs across files and reuse Python's standard library responsibly.",
    example:
      'from pathlib import Path\nfrom statistics import mean\n\nscores = [82, 91, 76, 88]\nprint("Average:", mean(scores))\nprint("Current folder:", Path.cwd())',
    sections: [
      {
        heading: "Import functionality you need",
        body: "A module is a Python file. The standard library provides modules for common tasks. Import the specific names you need or import the module and qualify the name for clarity.",
        code: 'import math\nfrom random import choice\n\nprint(math.sqrt(81))\nprint(choice(["red", "blue", "green"]))',
      },
      {
        heading: "Separate application responsibilities",
        body: "Put reusable functions in modules with descriptive names. Importing a module runs its top-level statements, so keep those statements lightweight and put program startup behind a main guard.",
        code: '# greetings.py\ndef greet(name):\n    return f"Hello, {name}!"\n\n# app.py could import greet from greetings',
      },
      {
        heading: "Use the main guard",
        body: '`if __name__ == "__main__":` runs code only when a file is executed directly, not when it is imported. This makes a file usable both as a script and as a reusable module.',
        code: 'def main():\n    print("Program started")\n\nif __name__ == "__main__":\n    main()',
      },
    ],
    exercises: [
      {
        title: "Use the standard library",
        task: "Use `statistics.mean` and `statistics.median` to summarize a list of scores.",
        starter: "import statistics\n\nscores = [65, 80, 80, 95, 100]\n",
        hint: "Call mean(scores) and median(scores).",
        solution:
          "import statistics\n\nscores = [65, 80, 80, 95, 100]\nprint(statistics.mean(scores))\nprint(statistics.median(scores))",
      },
      {
        title: "Create a reusable helper",
        task: "Write a slugify() function that trims text, lowercases it, and replaces spaces with hyphens.",
        starter: "def slugify(text):\n    pass\n",
        hint: "Chain strip(), lower(), and replace().",
        solution:
          'def slugify(text):\n    return text.strip().lower().replace(" ", "-")\n\nprint(slugify("  Python Basics Course "))',
      },
      {
        title: "Write a main guard",
        task: "Define main() to print a welcome and call it only when this file runs directly.",
        starter: "def main():\n    pass\n",
        hint: "Use the standard `__name__` check.",
        solution:
          'def main():\n    print("Welcome to the course!")\n\nif __name__ == "__main__":\n    main()',
      },
    ],
    quizzes: [
      {
        q: "What is a Python module?",
        options: ["A Python file", "A list method", "A data type"],
        answer: 0,
        why: "A module is a file containing Python definitions and statements.",
      },
      {
        q: "Why use a main guard?",
        options: [
          "To avoid running script startup code when the module is imported",
          "To make variables global",
          "To install packages",
        ],
        answer: 0,
        why: "The guard distinguishes direct execution from importing the file.",
      },
      {
        q: "Where should an import normally appear?",
        options: [
          "At the top of the file",
          "Inside every loop",
          "After the program exits",
        ],
        answer: 0,
        why: "Top-level imports make dependencies easy to find and avoid repeated imports.",
      },
    ],
  },
  {
    id: "v3-17",
    number: "17",
    title: "Object-oriented programming",
    intro:
      "Model related data and behavior with classes, instances, methods, and simple composition.",
    example:
      'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Deposit must be positive")\n        self.balance += amount\n\naccount = BankAccount("Mina", 20)\naccount.deposit(15)\nprint(account.owner, account.balance)',
    sections: [
      {
        heading: "A class describes a kind of object",
        body: "A class groups data and behavior. Calling the class creates an instance. `__init__` initializes the new instance; `self` refers to that instance and is passed automatically when you call an instance method.",
        code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} says woof"\n\npet = Dog("Pip")\nprint(pet.speak())',
      },
      {
        heading: "Protect a clear object contract",
        body: "Methods should preserve the object's expected state. Validate values at the boundary, raise a useful error for invalid operations, and keep attributes and methods named for their meaning.",
        code: "class Counter:\n    def __init__(self):\n        self.value = 0\n\n    def increment(self):\n        self.value += 1\n\ncounter = Counter()\ncounter.increment()\nprint(counter.value)",
      },
      {
        heading: "Prefer composition when it fits",
        body: "Composition means one object contains or uses another object. It often models real relationships with less complexity than inheritance. Use classes when they clarify state and behavior; simple functions and data structures are often enough.",
        code: "class Playlist:\n    def __init__(self, title):\n        self.title = title\n        self.songs = []\n\n    def add_song(self, song):\n        self.songs.append(song)",
      },
    ],
    exercises: [
      {
        title: "Build a rectangle class",
        task: "Create a Rectangle with width and height and methods for area and perimeter.",
        starter:
          "class Rectangle:\n    def __init__(self, width, height):\n        pass\n",
        hint: "Store dimensions on self; return the formulas from methods.",
        solution:
          "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\nshape = Rectangle(5, 3)\nprint(shape.area(), shape.perimeter())",
      },
      {
        title: "Create a bounded counter",
        task: "Create a Counter class that increments and never goes below zero when decremented.",
        starter:
          "class Counter:\n    def __init__(self, value=0):\n        self.value = value\n",
        hint: "Use max(0, self.value - 1) when decrementing.",
        solution:
          "class Counter:\n    def __init__(self, value=0):\n        self.value = max(0, value)\n\n    def increment(self):\n        self.value += 1\n\n    def decrement(self):\n        self.value = max(0, self.value - 1)\n\ncounter = Counter()\ncounter.decrement()\ncounter.increment()\nprint(counter.value)",
      },
      {
        title: "Model a book",
        task: "Create a Book with title and author; add a describe() method returning `title by author`.",
        starter: "class Book:\n    pass\n",
        hint: "Use an f-string in the method's return value.",
        solution:
          'class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n\n    def describe(self):\n        return f"{self.title} by {self.author}"\n\nprint(Book("Learning Python", "A. Student").describe())',
      },
    ],
    quizzes: [
      {
        q: "What does `self` refer to in an instance method?",
        options: [
          "The current instance",
          "The class's file",
          "A global variable",
        ],
        answer: 0,
        why: "Python supplies the current instance as the first argument of an instance method.",
      },
      {
        q: "What is `__init__` commonly used for?",
        options: ["Initialize an instance", "Delete a module", "Start a loop"],
        answer: 0,
        why: "__init__ sets up the new object's initial state.",
      },
      {
        q: "When is a class helpful?",
        options: [
          "When related state and behavior form a useful object",
          "For every single variable",
          "To avoid writing functions",
        ],
        answer: 0,
        why: "Classes are useful when they make related state and behavior clearer, not as a requirement for every problem.",
      },
    ],
  },
  {
    id: "v3-18",
    number: "18",
    title: "JSON and data exchange",
    intro:
      "Convert between Python data and JSON, validate incoming structures, and handle file data safely.",
    example:
      'import json\n\nstudent = {"name": "Ari", "scores": [82, 91], "active": True}\nencoded = json.dumps(student, indent=2)\nrestored = json.loads(encoded)\nprint(restored["name"], sum(restored["scores"]))',
    sections: [
      {
        heading: "JSON maps common data types",
        body: "JSON represents objects, arrays, strings, numbers, booleans, and null. Python dictionaries and lists map naturally to JSON objects and arrays. JSON does not support every Python object, such as sets or custom instances.",
        code: 'import json\n\ndata = {"name": "Noor", "active": True, "score": None}\ntext = json.dumps(data)\nprint(text)',
      },
      {
        heading: "Serialize and parse",
        body: "`json.dumps()` converts Python data to a JSON string; `json.loads()` parses a JSON string. For files, use `json.dump()` and `json.load()` with a context manager and UTF-8.",
        code: 'import json\n\npayload = \'{"items": [2, 4, 6]}\'\ndata = json.loads(payload)\nprint(data["items"])\nprint(json.dumps(data, indent=2))',
      },
      {
        heading: "Validate the shape you expect",
        body: "Valid JSON can still have missing keys or the wrong data types. Check that required fields exist and are the types your program expects before using them.",
        code: 'record = {"name": "Mina", "score": 90}\nif isinstance(record.get("score"), (int, float)):\n    print("Score:", record["score"])\nelse:\n    print("A numeric score is required.")',
      },
    ],
    exercises: [
      {
        title: "Round-trip a profile",
        task: "Serialize a profile dictionary to JSON text and parse it back, then display the person's name.",
        starter:
          'import json\n\nprofile = {"name": "Jo", "skills": ["Python", "SQL"]}\n',
        hint: "Use dumps() then loads().",
        solution:
          'import json\n\nprofile = {"name": "Jo", "skills": ["Python", "SQL"]}\ntext = json.dumps(profile)\nrestored = json.loads(text)\nprint(restored["name"])',
      },
      {
        title: "Validate a response",
        task: "Check that a data dictionary has a string `status` and a list `results`.",
        starter: 'data = {"status": "ok", "results": [1, 2, 3]}\n',
        hint: "Use isinstance(value, expected_type).",
        solution:
          'data = {"status": "ok", "results": [1, 2, 3]}\nvalid = isinstance(data.get("status"), str) and isinstance(data.get("results"), list)\nprint("Valid response" if valid else "Unexpected response format")',
      },
      {
        title: "Save JSON data",
        task: "Write a dictionary to `settings.json` as readable, indented UTF-8 JSON.",
        starter:
          'import json\nfrom pathlib import Path\n\nsettings = {"theme": "dark", "font_size": 14}\n',
        hint: "Use Path.open() and json.dump(..., indent=2).",
        solution:
          'import json\nfrom pathlib import Path\n\nsettings = {"theme": "dark", "font_size": 14}\nwith Path("settings.json").open("w", encoding="utf-8") as file:\n    json.dump(settings, file, indent=2)',
      },
    ],
    quizzes: [
      {
        q: "Which function converts a Python value to a JSON string?",
        options: ["json.dumps()", "json.loads()", "json.read()"],
        answer: 0,
        why: "dumps means dump to string; loads parses a string.",
      },
      {
        q: "Can valid JSON still contain data your program cannot use?",
        options: [
          "Yes, its shape or types may be unexpected",
          "No",
          "Only if it has spaces",
        ],
        answer: 0,
        why: "Parsing checks JSON syntax, not whether the data meets application-specific requirements.",
      },
      {
        q: "What Python value corresponds to JSON `null`?",
        options: ["None", "False", "0"],
        answer: 0,
        why: "JSON null is decoded by Python's json module as None.",
      },
    ],
  },
  {
    id: "v3-19",
    number: "19",
    title: "Testing and debugging",
    intro:
      "Write repeatable checks, use assertions appropriately, and debug from evidence rather than guesses.",
    example:
      'def add_tax(price, rate):\n    return price * (1 + rate)\n\nassert add_tax(100, 0.1) == 110\nassert round(add_tax(10, 0.08), 2) == 10.8\nprint("Checks passed")',
    sections: [
      {
        heading: "Make a failing case reproducible",
        body: "A reliable debugging cycle is: reproduce the problem, read the traceback, inspect the smallest relevant input, form one hypothesis, change one thing, and rerun checks. Printing temporary values can help reveal assumptions.",
        code: "def average(values):\n    return sum(values) / len(values)\n\nprint(average([2, 4, 6]))\n# Ask what should happen for an empty list.",
      },
      {
        heading: "Test a function's contract",
        body: "A test gives known inputs and checks expected outputs. Assertions are useful for quick learning examples; Python may disable assert statements in optimized mode, so use a test framework for maintained application tests.",
        code: "def is_even(number):\n    return number % 2 == 0\n\nassert is_even(4) is True\nassert is_even(5) is False",
      },
      {
        heading: "Test normal cases and edges",
        body: "Test typical values, boundaries, empty inputs, and invalid inputs. Independent tests help pinpoint failures. In real projects, use a test framework such as `unittest` or `pytest` and run tests automatically.",
        code: "def clamp(value, minimum, maximum):\n    return max(minimum, min(value, maximum))\n\nassert clamp(5, 0, 10) == 5\nassert clamp(-2, 0, 10) == 0\nassert clamp(12, 0, 10) == 10",
      },
    ],
    exercises: [
      {
        title: "Test a converter",
        task: "Write kilometers_to_miles() and add checks for zero and 10 kilometers.",
        starter: "def kilometers_to_miles(kilometers):\n    pass\n",
        hint: "One kilometer is approximately 0.621371 miles.",
        solution:
          'def kilometers_to_miles(kilometers):\n    return kilometers * 0.621371\n\nassert kilometers_to_miles(0) == 0\nassert round(kilometers_to_miles(10), 2) == 6.21\nprint("All tests passed")',
      },
      {
        title: "Find the edge case",
        task: "Improve average() so an empty list raises a clear ValueError, then test both cases.",
        starter: "def average(values):\n    return sum(values) / len(values)\n",
        hint: "Check whether values is empty before dividing.",
        solution:
          'def average(values):\n    if not values:\n        raise ValueError("values must not be empty")\n    return sum(values) / len(values)\n\nassert average([2, 4, 6]) == 4\ntry:\n    average([])\nexcept ValueError:\n    print("Empty input handled")',
      },
      {
        title: "Test a password rule",
        task: "Write a function that accepts strings of at least eight characters and test short and long inputs.",
        starter: "def is_long_enough(password):\n    pass\n",
        hint: "Return whether len(password) is at least 8.",
        solution:
          'def is_long_enough(password):\n    return len(password) >= 8\n\nassert is_long_enough("short") is False\nassert is_long_enough("long-enough") is True\nprint("Password length tests passed")',
      },
    ],
    quizzes: [
      {
        q: "Why test boundary and empty inputs?",
        options: [
          "They reveal assumptions that normal examples can miss",
          "They make code run faster",
          "They replace documentation",
        ],
        answer: 0,
        why: "Edge cases often expose division-by-zero, missing-value, and off-by-one bugs.",
      },
      {
        q: "What happens when an assert condition is false?",
        options: [
          "AssertionError is raised",
          "It becomes True",
          "It prints the condition",
        ],
        answer: 0,
        why: "A failed assertion raises AssertionError.",
      },
      {
        q: "What is a good first step when debugging?",
        options: [
          "Reproduce the issue and inspect the traceback",
          "Rewrite the entire program immediately",
          "Ignore the error message",
        ],
        answer: 0,
        why: "A reproducible failure and its traceback provide evidence for a focused fix.",
      },
    ],
  },
  {
    id: "v3-20",
    number: "20",
    title: "Professional Python habits",
    intro:
      "Improve maintainability with documentation, type hints, constants, and simple design principles.",
    example:
      '"""Small helpers for calculating order totals."""\n\nTAX_RATE = 0.08\n\ndef total_with_tax(subtotal: float) -> float:\n    """Return subtotal including the standard tax rate."""\n    return subtotal * (1 + TAX_RATE)\n\nprint(f"{total_with_tax(25):.2f}")',
    sections: [
      {
        heading: "Make intent easy to scan",
        body: "Choose descriptive names, keep functions focused, and remove duplicated rules by extracting helpers. Prefer clear code over clever one-liners. Follow PEP 8 conventions for consistent Python formatting.",
        code: "def calculate_discount(price, percentage):\n    discount = price * percentage\n    return price - discount\n\nprint(calculate_discount(80, 0.15))",
      },
      {
        heading: "Document public behavior",
        body: "A docstring describes what a module, class, or public function does, its important inputs, and what it returns or may raise. Comments should explain non-obvious reasons, not repeat the code.",
        code: 'def percentage(part: float, whole: float) -> float:\n    """Return part as a percentage of whole."""\n    if whole == 0:\n        raise ValueError("whole must not be zero")\n    return part / whole * 100',
      },
      {
        heading: "Type hints communicate expectations",
        body: "Type hints document expected types and help editor tools find mistakes. Python does not automatically enforce annotations at runtime. Start with straightforward built-in types and update hints when behavior changes.",
        code: 'def format_score(name: str, score: float) -> str:\n    return f"{name}: {score:.1f}%"\n\nprint(format_score("Mina", 91.25))',
      },
    ],
    exercises: [
      {
        title: "Refactor repeated formatting",
        task: "Create one format_price() function and use it to print three prices to two decimal places.",
        starter: "def format_price(price):\n    pass\n",
        hint: "Return a formatted string using an f-string.",
        solution:
          'def format_price(price: float) -> str:\n    """Format a price with two decimal places."""\n    return f"${price:.2f}"\n\nfor price in [3, 4.5, 12.345]:\n    print(format_price(price))',
      },
      {
        title: "Name the business rule",
        task: "Replace the unexplained 0.2 with a named constant and a function that calculates the discount.",
        starter: "DISCOUNT_RATE = 0.2\n",
        hint: "Use the constant inside a small function.",
        solution:
          "DISCOUNT_RATE = 0.2\n\ndef discounted_price(price):\n    return price * (1 - DISCOUNT_RATE)\n\nprint(discounted_price(50))",
      },
      {
        title: "Document a helper",
        task: "Write a documented function that returns the larger of two numbers and add type hints.",
        starter: "def larger(first, second):\n    pass\n",
        hint: "Use `-> float` or a suitable numeric annotation and a short docstring.",
        solution:
          'def larger(first: float, second: float) -> float:\n    """Return the larger of two numbers."""\n    return max(first, second)\n\nprint(larger(3, 7))',
      },
    ],
    quizzes: [
      {
        q: "What should a helpful comment explain?",
        options: [
          "A non-obvious reason or decision",
          "Every line word-for-word",
          "Nothing about the code",
        ],
        answer: 0,
        why: "Comments add value when they explain intent or non-obvious constraints.",
      },
      {
        q: "Do Python type hints enforce types automatically at runtime?",
        options: [
          "Yes, always",
          "No, they primarily document and support tools",
          "Only for strings",
        ],
        answer: 1,
        why: "Python does not automatically enforce annotations; external tools can analyze them.",
      },
      {
        q: "Why extract a repeated rule into a function?",
        options: [
          "It reduces duplication and gives the rule one clear home",
          "It guarantees there are no bugs",
          "It removes the need for tests",
        ],
        answer: 0,
        why: "Centralizing repeated behavior makes changes and testing easier.",
      },
    ],
  },
  {
    id: "v3-21",
    number: "21",
    title: "Working with dates and time",
    intro:
      "Represent dates, parse known formats, and calculate time differences with the standard library.",
    example:
      'from datetime import date, timedelta\n\ntoday = date.today()\ndue_date = today + timedelta(days=14)\nprint("Today:", today.isoformat())\nprint("Due:", due_date.isoformat())',
    sections: [
      {
        heading: "Use date objects for calendar dates",
        body: "`datetime.date` represents a calendar date without a time of day. `timedelta` represents a duration. These objects handle calendar rules more safely than manually adjusting day numbers.",
        code: "from datetime import date, timedelta\n\nstart = date(2026, 1, 1)\ndeadline = start + timedelta(days=30)\nprint(deadline)",
      },
      {
        heading: "Parse and format intentionally",
        body: "Use `strptime()` for a known input format and `strftime()` to create a display format. If a format is not known or is invalid, parsing raises ValueError. Prefer ISO format for unambiguous data exchange.",
        code: 'from datetime import datetime\n\nmeeting = datetime.strptime("2026-04-15", "%Y-%m-%d")\nprint(meeting.strftime("%A, %d %B %Y"))',
      },
      {
        heading: "Time zones matter",
        body: "A naive datetime has no time-zone information; an aware datetime identifies a time zone. For real applications that handle global event times, use timezone-aware datetimes and store or exchange timestamps consistently, commonly in UTC.",
        code: "from datetime import datetime, timezone\n\nnow_utc = datetime.now(timezone.utc)\nprint(now_utc.isoformat())",
      },
    ],
    exercises: [
      {
        title: "Days until a deadline",
        task: "Calculate how many days remain until a fixed deadline and display it.",
        starter:
          "from datetime import date\n\ntoday = date.today()\ndeadline = date(2026, 12, 31)\n",
        hint: "Subtract date objects; access the result's days.",
        solution:
          'from datetime import date\n\ntoday = date.today()\ndeadline = date(2026, 12, 31)\nremaining = (deadline - today).days\nprint(f"{remaining} days until the deadline")',
      },
      {
        title: "Parse a meeting date",
        task: "Parse `2026-08-03` and display it as `03/08/2026`.",
        starter: "from datetime import datetime\n",
        hint: "Use strptime() followed by strftime().",
        solution:
          'from datetime import datetime\n\nmeeting = datetime.strptime("2026-08-03", "%Y-%m-%d")\nprint(meeting.strftime("%d/%m/%Y"))',
      },
      {
        title: "Add a study period",
        task: "Find the date 45 days after today's date.",
        starter: "from datetime import date, timedelta\n",
        hint: "Add timedelta(days=45) to date.today().",
        solution:
          "from datetime import date, timedelta\n\nstudy_end = date.today() + timedelta(days=45)\nprint(study_end.isoformat())",
      },
    ],
    quizzes: [
      {
        q: "What does a timedelta represent?",
        options: ["A duration", "A text file", "A timezone"],
        answer: 0,
        why: "timedelta represents a difference or duration that can be added to dates.",
      },
      {
        q: "What kind of datetime identifies its time zone?",
        options: ["Naive", "Aware", "Unparsed"],
        answer: 1,
        why: "An aware datetime includes time-zone information.",
      },
      {
        q: "What happens if strptime() receives text that does not match its format?",
        options: [
          "It raises ValueError",
          "It silently guesses",
          "It returns today's date",
        ],
        answer: 0,
        why: "The text must match the specified format or parsing fails.",
      },
    ],
  },
  {
    id: "v3-22",
    number: "22",
    title: "HTTP APIs and web data",
    intro:
      "Understand requests and responses, read JSON from an API, and handle network failures responsibly.",
    example:
      'import json\n\nresponse_text = \'{"name": "Python", "released": 1991}\'\ndata = json.loads(response_text)\nprint(f"{data[\'name\']} began in {data[\'released\']}.")',
    sections: [
      {
        heading: "An API is a contract",
        body: "A web API exposes operations and data over HTTP. A client sends a request; a server responds with a status code, headers, and possibly a body. JSON is a common response format, but the response shape is part of the API contract.",
        code: 'response = {"status": 200, "body": {"message": "ok"}}\nif response["status"] == 200:\n    print(response["body"]["message"])',
      },
      {
        heading: "Request data with a client library",
        body: "Python's standard library includes urllib for HTTP. Larger applications often use a maintained HTTP client library. Always check status codes, set sensible timeouts, validate response data, and follow the service's usage rules.",
        code: "# Typical workflow with an HTTP client:\n# response = client.get(url, timeout=10)\n# response.raise_for_status()\n# data = response.json()\n# Validate the fields before using them.",
      },
      {
        heading: "Network calls can fail",
        body: "A server may be unavailable, a request may time out, or the response may contain invalid data. Handle expected network and parsing errors, report them clearly, and avoid retry loops that overload a service.",
        code: 'import json\n\ntry:\n    data = json.loads(\'{"ok": true}\')\nexcept json.JSONDecodeError as error:\n    print("The response was not valid JSON:", error)\nelse:\n    print(data["ok"])',
      },
    ],
    exercises: [
      {
        title: "Parse an API-style response",
        task: "Parse the JSON text and display the names of all returned users.",
        starter:
          'import json\n\npayload = \'{"users": [{"name": "Ari"}, {"name": "Mina"}]}\'\n',
        hint: "Use json.loads(), then loop through data['users'].",
        solution:
          'import json\n\npayload = \'{"users": [{"name": "Ari"}, {"name": "Mina"}]}\'\ndata = json.loads(payload)\nfor user in data["users"]:\n    print(user["name"])',
      },
      {
        title: "Validate API fields",
        task: "Check that a parsed response contains a numeric `temperature` before displaying it.",
        starter: 'response = {"temperature": 21.5, "unit": "C"}\n',
        hint: "Use get() and isinstance() to check the field.",
        solution:
          'response = {"temperature": 21.5, "unit": "C"}\ntemperature = response.get("temperature")\nif isinstance(temperature, (int, float)):\n    print(f"Temperature: {temperature} {response.get(\'unit\', \'\')}")\nelse:\n    print("The response did not contain a numeric temperature.")',
      },
      {
        title: "Report parsing errors",
        task: "Attempt to parse malformed JSON and display a helpful error instead of crashing.",
        starter: 'import json\n\npayload = \'{"name": "Mina",}\'\n',
        hint: "Catch json.JSONDecodeError.",
        solution:
          'import json\n\npayload = \'{"name": "Mina",}\'\ntry:\n    data = json.loads(payload)\nexcept json.JSONDecodeError as error:\n    print("Could not read the response:", error.msg)\nelse:\n    print(data)',
      },
    ],
    quizzes: [
      {
        q: "What does an HTTP status code communicate?",
        options: [
          "The broad outcome of the request",
          "The Python version",
          "The JSON indentation level",
        ],
        answer: 0,
        why: "Status codes indicate success, redirection, client errors, or server errors.",
      },
      {
        q: "Why validate fields after parsing JSON?",
        options: [
          "Valid JSON can still have missing or unexpected fields",
          "JSON cannot contain strings",
          "Parsing automatically checks business rules",
        ],
        answer: 0,
        why: "Syntax validity does not guarantee the response matches the data your program expects.",
      },
      {
        q: "Why set a network timeout?",
        options: [
          "To avoid waiting indefinitely for a response",
          "To change the API's data",
          "To skip status checking",
        ],
        answer: 0,
        why: "Timeouts bound how long the client waits when a service is slow or unreachable.",
      },
    ],
  },
  {
    id: "v3-23",
    number: "23",
    title: "Capstone: command-line task manager",
    intro:
      "Combine functions, collections, validation, and JSON persistence in a small complete application.",
    example:
      'tasks = [{"title": "Practice loops", "done": False}]\n\ndef list_tasks(items):\n    for number, task in enumerate(items, start=1):\n        mark = "x" if task["done"] else " "\n        print(f"{number}. [{mark}] {task[\'title\']}")\n\nlist_tasks(tasks)',
    sections: [
      {
        heading: "Plan the data before the menu",
        body: "Represent each task as a dictionary with a title and completion flag; store the tasks in a list. Decide what each operation needs to validate before writing the menu.",
        code: 'tasks = [\n    {"title": "Review strings", "done": False},\n    {"title": "Solve a loop exercise", "done": True},\n]\nprint(tasks)',
      },
      {
        heading: "Give operations clear functions",
        body: "Keep listing, adding, completing, and saving in separate functions. This keeps the menu loop small and allows each operation to be tested independently.",
        code: 'def add_task(tasks, title):\n    clean_title = title.strip()\n    if not clean_title:\n        raise ValueError("Task title cannot be empty")\n    tasks.append({"title": clean_title, "done": False})',
      },
      {
        heading: "Persist data and test edge cases",
        body: "Save tasks to JSON so they survive a program restart. Consider missing or malformed files, empty task lists, invalid task numbers, and duplicate saves. Build one feature at a time and test it before adding the next.",
        code: 'def complete_task(tasks, position):\n    if not 1 <= position <= len(tasks):\n        raise IndexError("No task at that number")\n    tasks[position - 1]["done"] = True',
      },
    ],
    exercises: [
      {
        title: "Implement list_tasks()",
        task: "Display numbered tasks with `[x]` when done and `[ ]` when incomplete.",
        starter:
          'tasks = [{"title": "Study", "done": False}, {"title": "Practice", "done": True}]\n\ndef list_tasks(tasks):\n    pass\n',
        hint: "Use enumerate(..., start=1) and choose a mark from each task's done value.",
        solution:
          'tasks = [{"title": "Study", "done": False}, {"title": "Practice", "done": True}]\n\ndef list_tasks(tasks):\n    for number, task in enumerate(tasks, start=1):\n        mark = "x" if task["done"] else " "\n        print(f"{number}. [{mark}] {task[\'title\']}")\n\nlist_tasks(tasks)',
      },
      {
        title: "Add and complete tasks",
        task: "Write functions to add a non-empty task and mark a valid one-based position complete.",
        starter:
          "def add_task(tasks, title):\n    pass\n\ndef complete_task(tasks, position):\n    pass\n",
        hint: "Strip and validate titles; translate a one-based position to index position - 1.",
        solution:
          'def add_task(tasks, title):\n    title = title.strip()\n    if not title:\n        raise ValueError("Task title cannot be empty")\n    tasks.append({"title": title, "done": False})\n\ndef complete_task(tasks, position):\n    if not 1 <= position <= len(tasks):\n        raise IndexError("No task at that number")\n    tasks[position - 1]["done"] = True\n\ntasks = []\nadd_task(tasks, "Practice Python")\ncomplete_task(tasks, 1)\nprint(tasks)',
      },
      {
        title: "Save and load tasks",
        task: "Use JSON and pathlib to save a task list and load it back; use an empty list if no file exists.",
        starter:
          'import json\nfrom pathlib import Path\n\nTASK_FILE = Path("tasks.json")\n',
        hint: "Handle FileNotFoundError when loading and use UTF-8.",
        solution:
          'import json\nfrom pathlib import Path\n\nTASK_FILE = Path("tasks.json")\n\ndef save_tasks(tasks):\n    with TASK_FILE.open("w", encoding="utf-8") as file:\n        json.dump(tasks, file, indent=2)\n\ndef load_tasks():\n    try:\n        with TASK_FILE.open(encoding="utf-8") as file:\n            return json.load(file)\n    except FileNotFoundError:\n        return []\n\nsave_tasks([{"title": "Practice", "done": False}])\nprint(load_tasks())',
      },
    ],
    quizzes: [
      {
        q: "Why separate task operations into functions?",
        options: [
          "Each operation is easier to understand and test",
          "Functions automatically save data",
          "Functions remove the need for validation",
        ],
        answer: 0,
        why: "Focused functions make the program easier to extend and debug.",
      },
      {
        q: "Why is a user's task number converted from one-based to zero-based?",
        options: [
          "Python list indexes start at zero",
          "The list is a dictionary",
          "Numbers cannot be stored",
        ],
        answer: 0,
        why: "A displayed task 1 is stored at list index 0.",
      },
      {
        q: "What should a robust app do if its save file is missing?",
        options: [
          "Handle the expected case and start with empty data",
          "Silently delete other files",
          "Assume JSON created it",
        ],
        answer: 0,
        why: "A first run commonly has no file yet; handle that case intentionally.",
      },
    ],
  },
  {
    id: "v3-24",
    number: "24",
    title: "Capstone: data report and next steps",
    intro:
      "Build a polished analysis workflow and learn a practical path from course exercises to independent projects.",
    example:
      'sales = [("Notebook", 3, 4.5), ("Pen", 10, 1.2), ("Folder", 2, 3.0)]\nrevenue_by_item = {name: quantity * price for name, quantity, price in sales}\ntotal_revenue = sum(revenue_by_item.values())\nfor name, revenue in revenue_by_item.items():\n    print(f"{name}: ${revenue:.2f}")\nprint(f"Total: ${total_revenue:.2f}")',
    sections: [
      {
        heading: "Turn a question into a data model",
        body: "A small report starts with a question, such as “Which product earned the most?” Represent each record consistently, validate values, and compute results using small, named functions.",
        code: 'sales = [\n    {"product": "Notebook", "quantity": 3, "price": 4.5},\n    {"product": "Pen", "quantity": 10, "price": 1.2},\n]\nprint(sum(row["quantity"] * row["price"] for row in sales))',
      },
      {
        heading: "Separate calculation from presentation",
        body: "Keep calculations independent from printing so they can be reused and tested. Format values only when presenting them. Write a few tests for totals, empty data, and a single record.",
        code: 'def revenue_for(row):\n    return row["quantity"] * row["price"]\n\ndef total_revenue(rows):\n    return sum(revenue_for(row) for row in rows)',
      },
      {
        heading: "A professional learning path",
        body: "The next step is to build small projects, read documentation, use version control, test behavior, and ask for code review. Then explore a specialty such as web development, automation, data analysis, or machine learning. No single short course makes someone a professional; consistent project work does.",
        callout:
          "Challenge yourself: add CSV import, input validation, tests, and a command-line interface to the report.",
      },
    ],
    exercises: [
      {
        title: "Calculate item revenue",
        task: "Create a function that returns revenue for a product record, then calculate total revenue.",
        starter:
          'sales = [{"product": "Notebook", "quantity": 3, "price": 4.5}, {"product": "Pen", "quantity": 10, "price": 1.2}]\n',
        hint: "Revenue is quantity multiplied by price.",
        solution:
          'sales = [{"product": "Notebook", "quantity": 3, "price": 4.5}, {"product": "Pen", "quantity": 10, "price": 1.2}]\n\ndef revenue_for(row):\n    return row["quantity"] * row["price"]\n\ntotal = sum(revenue_for(row) for row in sales)\nprint(f"Revenue: ${total:.2f}")',
      },
      {
        title: "Find the best-selling item",
        task: "Find the product with the largest quantity sold and display its name and quantity.",
        starter:
          'sales = [{"product": "Notebook", "quantity": 3}, {"product": "Pen", "quantity": 10}, {"product": "Folder", "quantity": 2}]\n',
        hint: "Use max() with a key function that reads quantity.",
        solution:
          'sales = [{"product": "Notebook", "quantity": 3}, {"product": "Pen", "quantity": 10}, {"product": "Folder", "quantity": 2}]\nbest_seller = max(sales, key=lambda row: row["quantity"])\nprint(best_seller["product"], best_seller["quantity"])',
      },
      {
        title: "Add a report test",
        task: "Write total_revenue() and assert correct results for multiple rows and an empty list.",
        starter: "def total_revenue(rows):\n    pass\n",
        hint: "sum() returns zero for an empty iterable.",
        solution:
          'def total_revenue(rows):\n    return sum(row["quantity"] * row["price"] for row in rows)\n\nassert total_revenue([{"quantity": 2, "price": 5}]) == 10\nassert total_revenue([]) == 0\nprint("Report tests passed")',
      },
    ],
    quizzes: [
      {
        q: "Why separate calculation from presentation?",
        options: [
          "It makes calculation reusable and easier to test",
          "It prevents all invalid input",
          "It makes Python ignore errors",
        ],
        answer: 0,
        why: "A pure calculation can be tested independently from printed formatting.",
      },
      {
        q: "What is a good next step after learning fundamentals?",
        options: [
          "Build and test small projects while reading documentation",
          "Stop practicing",
          "Copy a large program without understanding it",
        ],
        answer: 0,
        why: "Independent projects and feedback help turn concepts into durable skills.",
      },
      {
        q: "Which result does `max(rows, key=...)` provide?",
        options: [
          "The item with the greatest value from the key function",
          "A sorted copy of every item",
          "The smallest item",
        ],
        answer: 0,
        why: "max() uses the key function to decide which item is largest.",
      },
    ],
  },
];
