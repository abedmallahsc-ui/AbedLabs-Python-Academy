const topicData = [
  {
    title: "Slicing and sequence patterns",
    intro:
      "Use slices to select, copy, reverse, and transform portions of strings, lists, and other sequences.",
    sections: [
      {
        heading: "Slice boundaries",
        body: "A slice uses `sequence[start:stop:step]`. The start is included and the stop is excluded. Leaving start or stop blank uses the beginning or end. Negative indexes count backward from the end. Slicing past a boundary is safe and returns the available portion.",
        code: 'letters = "PYTHON"\nprint(letters[1:4])  # YTH\nprint(letters[:2])   # PY\nprint(letters[-3:])  # HON',
      },
      {
        heading: "Steps and reverse slices",
        body: "The optional step chooses which positions to visit. A step of 2 takes every other item; a step of -1 walks backward. A zero step is invalid. The same slice syntax works with lists and tuples.",
        code: "numbers = [0, 1, 2, 3, 4, 5]\nprint(numbers[::2])   # [0, 2, 4]\nprint(numbers[::-1])  # [5, 4, 3, 2, 1, 0]",
      },
      {
        heading: "Slices make shallow copies",
        body: "For a list, `items[:]` creates a new outer list, but nested objects are still shared. Assigning to a slice can replace, insert, or delete multiple items. Use clear bounds and test empty and one-item sequences.",
        code: 'items = ["a", "b", "c", "d"]\ncopy = items[:]\nitems[1:3] = ["x"]\nprint(items, copy)',
      },
      {
        heading: "Use slices for common sequence operations",
        body: "A slice has the form sequence[start:stop:step]. Start is included, stop is excluded, and step defaults to 1. Omitting start or stop means continue from the corresponding end. Negative indexes count backward from the end, so -1 is the last item. A positive step moves forward; a negative step moves backward. Combining two list slices rotates a sequence without a loop.",
        code: 'word = "university"\n# Index:   0123456789\nprint(word[2:8])       # iversi: indexes 2 through 7\nprint(word[:3])        # uni: first three\nprint(word[-4:])       # sity: last four\nprint(word[2:8:2])     # ies: every second item in the range\nprint(word[::-1])      # reversed string\n\nitems = ["a", "b", "c", "d", "e"]\nprint(items[2:] + items[:2])  # ["c", "d", "e", "a", "b"]',
      },
      {
        heading: "Predict a slice by listing its indexes",
        body: "To trace a slice, write the sequence indexes, start at the requested start position, and keep moving by step until the next index would reach or pass the exclusive stop. For a negative step, move left instead. When a bound is omitted, Python uses the appropriate end for that direction. This method makes off-by-one errors easier to catch.",
        code: 'letters = "PYTHON"\n# Index:    0 1 2 3 4 5\n# Letter:   P Y T H O N\nprint(letters[1:5:2])   # YH: positions 1, then 3\nprint(letters[-2:])     # ON: from index -2 to the end\nprint(letters[:-2])     # PYTH: stop before index -2\nprint(letters[4:1:-1])  # OHT: positions 4, 3, 2\nprint(letters[2:2])     # empty string: start equals stop',
      },
      {
        heading: "Change list regions and avoid boundary mistakes",
        body: "Slice assignment replaces a region of a mutable list, and deleting a slice removes that region. A plain slice assignment can change the list's length; an extended slice such as [::2] requires the replacement to have the same number of items. An empty slice is valid, while a zero step raises ValueError.",
        code: 'values = [0, 1, 2, 3, 4, 5]\nvalues[1:3] = [10, 11, 12]  # replacement length may differ\nprint(values)  # [0, 10, 11, 12, 3, 4, 5]\nvalues[::2] = [20, 30, 40]  # extended slice needs three replacements\nprint(values)  # [20, 10, 30, 12, 40, 4, 5]\ndel values[-2:]\nprint(values)  # [20, 10, 30, 12, 40]\nprint("Python"[20:])  # empty string',
      },
    ],
    facts: [
      "The slice stop index is excluded from the result.",
      "A negative index counts from the end of a sequence.",
      "An omitted start means begin at the first item.",
      "An omitted stop means continue to the sequence end.",
      "A positive step moves forward through indexes.",
      "A negative step can traverse a sequence backward.",
      "A slice beyond the end is clipped rather than raising IndexError.",
      "A list slice creates a new outer list.",
      "Nested values inside a shallow copied list remain shared.",
      "A slice assignment can replace a range of list values.",
    ],
    predictions: [
      ['print("PYTHON"[1:4])', "YTH"],
      ['print("PYTHON"[:2])', "PY"],
      ['print("PYTHON"[-3:])', "HON"],
      ["print([0, 1, 2, 3, 4][::2])", "[0, 2, 4]"],
      ["print([0, 1, 2, 3][::-1])", "[3, 2, 1, 0]"],
      ['print("abcdef"[2:5])', "cde"],
      ["print([4, 5, 6][8:])", "[]"],
      ['print("abcdef"[::3])', "ad"],
      ["print([1, 2, 3, 4][1:-1])", "[2, 3]"],
      ['print("Python"[-1])', "n"],
    ],
    exercises: [
      ["Email mask", 'email = "student@example.edu"', "Keep the first two characters and domain; mask the rest.", "Use find('@') and slices.", 'email = "student@example.edu"\nname, domain = email.split("@", 1)\nmasked = name[:2] + "*" * max(0, len(name) - 2)\nprint(masked + "@" + domain)'],
      ["Chunk a list", "values = list(range(1, 13))", "Print the first four, last three, and every second value.", "Use [:4], [-3:], and [::2].", "values = list(range(1, 13))\nprint(values[:4])\nprint(values[-3:])\nprint(values[::2])"],
      ["Rotate a sequence", 'items = ["a", "b", "c", "d", "e"]', "Move the first two values to the end using slices.", "Combine items[2:] and items[:2].", 'items = ["a", "b", "c", "d", "e"]\nrotated = items[2:] + items[:2]\nprint(rotated)'],
    ],
  },
  {
    title: "Enumerate, zip, and unpacking",
    intro:
      "Process sequences with their positions, combine related data, and unpack values safely.",
    sections: [
      {
        heading: "Enumerate values with positions",
        body: "`enumerate(iterable, start=...)` produces index-value pairs without manually incrementing a counter. Use it when the position matters for a label or report; loop over values alone when it does not.",
        code: 'names = ["Mina", "Omar", "Ari"]\nfor number, name in enumerate(names, start=1):\n    print(f"{number}. {name}")',
      },
      {
        heading: "Zip related sequences",
        body: "`zip(a, b)` pairs items in order and stops when the shortest input ends. This avoids index mistakes when processing parallel data. Use `strict=True` in modern Python when unequal lengths should be treated as a bug.",
        code: 'names = ["Ari", "Mina"]\nscores = [84, 96]\nfor name, score in zip(names, scores, strict=True):\n    print(name, score)',
      },
      {
        heading: "Unpack structured values",
        body: "Unpacking assigns iterable items to several names in one statement. The counts must match unless you use a starred target such as `first, *middle, last`. Unpacking makes records clearer, but use descriptive names.",
        code: 'record = ("Mina", 92, "A")\nname, score, grade = record\nprint(name, score, grade)\nfirst, *rest = [10, 20, 30, 40]\nprint(first, rest)',
      },
    ],
    facts: [
      "enumerate yields a position and a value for each item.",
      "The default starting index for enumerate is zero.",
      "The start argument lets enumerate begin at a chosen number.",
      "zip combines corresponding items from multiple iterables.",
      "zip normally stops when its shortest input is exhausted.",
      "zip with strict=True detects mismatched iterable lengths.",
      "Unpacking assigns iterable elements to multiple names.",
      "Ordinary unpacking requires the number of targets to match.",
      "A starred unpacking target collects remaining items into a list.",
      "Use descriptive names for unpacked values to clarify their meaning.",
    ],
    predictions: [
      [`print(list(enumerate(["a", "b"])))`, "[(0, 'a'), (1, 'b')]"],
      [`print(list(enumerate(["a", "b"], start=1)))`, "[(1, 'a'), (2, 'b')]"],
      ['print(list(zip([1, 2], ["x", "y"])))', "[(1, 'x'), (2, 'y')]"],
      ["print(list(zip([1, 2, 3], [9])))", "[(1, 9)]"],
      ['first, *rest = [2, 4, 6]\nprint(first, rest)', "2 [4, 6]"],
      ['name, score = ("Ari", 88)\nprint(score)', "88"],
      ['print(list(zip("ab", [1, 2])))', "[('a', 1), ('b', 2)]"],
      ['print(list(enumerate([], start=5)))', "[]"],
      ["a, *middle, b = [1, 2, 3, 4]\nprint(middle)", "[2, 3]"],
      ['print(list(zip([1, 2], [3, 4], strict=True)))', "[(1, 3), (2, 4)]"],
    ],
    exercises: [
      ["Number a list", 'tasks = ["read", "code", "review"]', "Print each task with a number starting at 1.", "Use enumerate(tasks, start=1).", 'tasks = ["read", "code", "review"]\nfor number, task in enumerate(tasks, start=1):\n    print(f"{number}: {task}")'],
      ["Pair names and grades", 'names = ["Noor", "Ari"]\nscores = [91, 87]', "Create and print name-score pairs; ensure mismatched lists are caught.", "Use zip(..., strict=True).", 'names = ["Noor", "Ari"]\nscores = [91, 87]\nfor name, score in zip(names, scores, strict=True):\n    print(f"{name}: {score}")'],
      ["Unpack a record", 'student = ("Jo", 20, "Computer Science")', "Unpack the record into clear names and print a sentence.", "Use one target per value.", 'student = ("Jo", 20, "Computer Science")\nname, age, major = student\nprint(f"{name} is {age} and studies {major}.")'],
    ],
  },
  {
    title: "Sorting and searching",
    intro:
      "Sort collections predictably, design sort keys, and search values without hidden assumptions.",
    sections: [
      {
        heading: "Sort a copy or sort in place",
        body: "`sorted(iterable)` returns a new list and works with many iterables. `list.sort()` changes a list in place and returns None. Both accept `reverse=True` and a `key` function.",
        code: 'scores = [72, 95, 81]\nprint(sorted(scores))\nscores.sort(reverse=True)\nprint(scores)',
      },
      {
        heading: "Sort records with a key",
        body: "A key function maps each item to the value used for comparison. Sort dictionaries by a field, or use a tuple key to add a tie-breaker. Python's sort is stable, so equal keys preserve their prior order.",
        code: 'students = [{"name": "Ari", "score": 90}, {"name": "Mina", "score": 96}]\nranked = sorted(students, key=lambda row: (-row["score"], row["name"]))\nprint(ranked)',
      },
      {
        heading: "Choose an appropriate search",
        body: "Membership checks such as `item in list` scan sequentially. Binary search can be much faster, but only on sorted data. A dictionary or set provides efficient average membership checks when the problem is about key lookup or uniqueness.",
        code: 'values = [2, 4, 6, 8, 10]\ntarget = 8\nprint(target in values)\nprint(values.index(target))',
      },
    ],
    facts: [
      "sorted returns a new list and does not change the original sequence.",
      "list.sort changes the list in place and returns None.",
      "reverse=True orders items in descending order.",
      "A key function selects the value used to compare each item.",
      "Tuple keys can add a deterministic tie-breaking field.",
      "Python sorting is stable for items with equal keys.",
      "The in operator performs a sequential search in a list.",
      "Binary search requires data already sorted by the searched key.",
      "A set is useful for uniqueness and membership testing.",
      "A dictionary maps keys to values for direct lookup.",
    ],
    predictions: [
      ["print(sorted([3, 1, 2]))", "[1, 2, 3]"],
      ["print(sorted([3, 1, 2], reverse=True))", "[3, 2, 1]"],
      ['items = [3, 1]\nresult = items.sort()\nprint(items, result)', "[1, 3] None"],
      ['print(sorted(["pear", "fig", "apple"], key=len))', "['fig', 'pear', 'apple']"],
      ["print(4 in [1, 2, 3])", "False"],
      ["print(sorted([(2, 'b'), (1, 'c'), (1, 'a')]))", "[(1, 'a'), (1, 'c'), (2, 'b')]"],
      ['words = ["A", "b"]\nprint(sorted(words, key=str.lower))', "['A', 'b']"],
      ["print([2, 4, 6].index(4))", "1"],
      ["print(sorted({3, 1, 2}))", "[1, 2, 3]"],
      ['print(sorted([{"n":"b"},{"n":"a"}], key=lambda x:x["n"]))', "[{'n': 'a'}, {'n': 'b'}]"],
    ],
    exercises: [
      ["Sort names", 'names = ["Zara", "ari", "Mina"]', "Sort names case-insensitively without changing the original list.", "Use sorted(..., key=str.casefold).", 'names = ["Zara", "ari", "Mina"]\nordered = sorted(names, key=str.casefold)\nprint(ordered)\nprint(names)'],
      ["Rank students", 'students = [{"name": "Jo", "score": 88}, {"name": "Ari", "score": 88}, {"name": "Mina", "score": 95}]', "Sort by score descending, then name ascending.", "Use a tuple key with negative score.", 'students = [{"name": "Jo", "score": 88}, {"name": "Ari", "score": 88}, {"name": "Mina", "score": 95}]\nranked = sorted(students, key=lambda row: (-row["score"], row["name"]))\nfor student in ranked:\n    print(student["name"], student["score"])'],
      ["Search safely", "values = [4, 8, 15, 16, 23, 42]", "Find whether a target exists and report its index if present.", "Check `in` before using index().", 'values = [4, 8, 15, 16, 23, 42]\ntarget = 15\nif target in values:\n    print("Index:", values.index(target))\nelse:\n    print("Not found")'],
    ],
  },
  {
    title: "Algorithm thinking and complexity",
    intro:
      "Compare approaches by how their work grows, then choose simple and efficient algorithms.",
    sections: [
      {
        heading: "Count growth, not milliseconds",
        body: "Big-O describes how an algorithm's resource use grows with input size, ignoring machine-specific constants. O(1) is constant work, O(n) grows linearly, O(n²) often comes from nested loops over n items, and O(log n) repeatedly halves a search space.",
        code: "def contains_value(values, target):\n    for value in values:  # up to n checks\n        if value == target:\n            return True\n    return False",
      },
      {
        heading: "Nested loops can multiply work",
        body: "A loop over every pair often performs about n × n operations. This may be fine for small inputs but becomes expensive as data grows. Measure real code before optimizing; algorithm choice usually matters more than tiny syntax changes.",
        code: "pairs = []\nfor left in [1, 2, 3]:\n    for right in [1, 2, 3]:\n        pairs.append((left, right))\nprint(len(pairs))",
      },
      {
        heading: "Use the right data structure",
        body: "Searching a list is O(n) in the worst case; average set or dictionary membership is O(1). Sorting costs about O(n log n) for general comparison sorting. Complexity is a guide, not a promise: memory, input size, ordering, and clarity all matter.",
        code: "values = [10, 20, 30]\nlookup = set(values)\nprint(20 in values)\nprint(20 in lookup)",
      },
    ],
    facts: [
      "Big-O describes how work or memory grows with input size.",
      "O(1) means constant growth with respect to input size.",
      "A single scan over n items is generally O(n).",
      "Two nested scans over n items can perform O(n squared) work.",
      "Repeatedly halving a search range leads to O(log n) work.",
      "Binary search requires sorted input.",
      "Sorting comparison-based general data typically takes O(n log n).",
      "List membership is generally linear in list length.",
      "Set and dictionary membership are average constant time.",
      "Benchmark real workloads before making low-level optimizations.",
    ],
    predictions: [
      ["print(1 + 1)", "2"],
      ["print(len(list(range(5))))", "5"],
      ["print(len([(a, b) for a in range(3) for b in range(3)]))", "9"],
      ["print(16 // 2 // 2 // 2 // 2)", "1"],
      ["print(7 in [2, 4, 7, 9])", "True"],
      ["print(7 in {2, 4, 7, 9})", "True"],
      ["print(len(set([1, 1, 2, 2, 3])))", "3"],
      ["print(sorted([5, 1, 4, 2, 3]))", "[1, 2, 3, 4, 5]"],
      ["print(sum(range(1, 5)))", "10"],
      ["print([(n, n) for n in range(2)])", "[(0, 0), (1, 1)]"],
    ],
    exercises: [
      ["Count matches", "values = [2, 5, 2, 7, 2, 9]", "Count how often 2 occurs in one pass.", "Use a counter and a for loop.", "values = [2, 5, 2, 7, 2, 9]\ntarget = 2\ncount = 0\nfor value in values:\n    if value == target:\n        count += 1\nprint(count)"],
      ["Avoid repeated scans", "values = list(range(1000))\nqueries = [5, 501, 999]", "Answer many membership queries efficiently.", "Build a set once, then check every query.", "values = list(range(1000))\nqueries = [5, 501, 999]\nlookup = set(values)\nfor query in queries:\n    print(query, query in lookup)"],
      ["Compare pair approaches", "values = [1, 2, 3, 4, 5]", "Print pairs whose sum is 6 without producing duplicate reversed pairs.", "Only compare right-side items after the current item.", "values = [1, 2, 3, 4, 5]\nfor index, left in enumerate(values):\n    for right in values[index + 1:]:\n        if left + right == 6:\n            print(left, right)"],
    ],
  },
  {
    title: "Iterators and generators",
    intro:
      "Understand lazy iteration and generate values on demand to work efficiently with large data.",
    sections: [
      {
        heading: "Iterable versus iterator",
        body: "An iterable can provide an iterator; a list is iterable. An iterator remembers its current position and produces values with `next()` until StopIteration. A for loop manages this protocol for you.",
        code: "names = [\"Ari\", \"Mina\"]\niterator = iter(names)\nprint(next(iterator))\nprint(next(iterator))",
      },
      {
        heading: "yield creates a generator",
        body: "A generator function uses `yield` to produce one value and pause its local state. The next request resumes where it paused. This is memory-efficient for sequences that can be computed one item at a time.",
        code: "def countdown(start):\n    while start > 0:\n        yield start\n        start -= 1\n\nprint(list(countdown(3)))",
      },
      {
        heading: "Use lazy pipelines thoughtfully",
        body: "Generator expressions and tools such as `map()` can avoid building intermediate lists. They are consumed once; convert to a list only when you need to store or inspect all values. Do not retain enormous data unnecessarily.",
        code: "squares = (number ** 2 for number in range(5))\nprint(next(squares))\nprint(list(squares))",
      },
    ],
    facts: [
      "An iterable can produce an iterator.",
      "An iterator remembers its current position.",
      "iter() obtains an iterator from an iterable.",
      "next() requests the next item from an iterator.",
      "An exhausted iterator raises StopIteration.",
      "A for loop handles iterator advancement and exhaustion.",
      "yield pauses a generator function and preserves its local state.",
      "A generator produces values lazily as they are requested.",
      "A generator object is normally consumed only once.",
      "Converting a generator to a list materializes all remaining values.",
    ],
    predictions: [
      ['it = iter(["a", "b"])\nprint(next(it))', "a"],
      ['it = iter([4, 5])\nprint(next(it), next(it))', "4 5"],
      ["print(list(number * 2 for number in range(3)))", "[0, 2, 4]"],
      ["print(sum(number for number in range(5)))", "10"],
      ["values = (n + 1 for n in [1, 2])\nprint(next(values))", "2"],
      ["values = (n for n in [1, 2])\nprint(list(values), list(values))", "[1, 2] []"],
      ["def one():\n    yield 7\nprint(list(one()))", "[7]"],
      ["print(list(range(3)))", "[0, 1, 2]"],
      ["print(next(iter('ok')))", "o"],
      ["print(sum(x * x for x in [2, 3]))", "13"],
    ],
    exercises: [
      ["Generate squares", "def squares(limit):\n    pass", "Yield squares from zero up to, but not including, limit.", "Use a for loop and yield number ** 2.", "def squares(limit):\n    for number in range(limit):\n        yield number ** 2\n\nprint(list(squares(5)))"],
      ["Read in batches", "def batches(items, size):\n    pass", "Yield successive list batches of size size.", "Use range with a step and slice each batch.", "def batches(items, size):\n    for start in range(0, len(items), size):\n        yield items[start:start + size]\n\nprint(list(batches(list(range(7)), 3)))"],
      ["Create an infinite sequence safely", "def ids(start=1):\n    pass", "Yield increasing IDs; consume only the first five.", "A while True generator is safe when the consumer is bounded.", "def ids(start=1):\n    while True:\n        yield start\n        start += 1\n\nfrom itertools import islice\nprint(list(islice(ids(10), 5)))"],
    ],
  },
  {
    title: "Lambda, map, filter, and functional tools",
    intro:
      "Transform data with functions while choosing the clearest approach for each task.",
    sections: [
      {
        heading: "A lambda is a small anonymous function",
        body: "A lambda contains one expression and returns its value. It is often useful as a short key function, but a named `def` is clearer for multi-step logic, reused behavior, or documentation.",
        code: 'products = [("pen", 2.0), ("book", 8.5)]\nprint(sorted(products, key=lambda item: item[1]))',
      },
      {
        heading: "map transforms and filter selects",
        body: "`map(function, iterable)` applies a function to each item; `filter(predicate, iterable)` keeps items whose predicate is true. Both return lazy iterators. Comprehensions are often easier to read for simple transformations and filters.",
        code: "values = [1, 2, 3, 4]\ndoubled = list(map(lambda x: x * 2, values))\neven = list(filter(lambda x: x % 2 == 0, values))\nprint(doubled, even)",
      },
      {
        heading: "Choose explicitness over cleverness",
        body: "Higher-order functions accept or return other functions. They can make data pipelines composable, but nested lambdas obscure meaning. Use named functions and intermediate variables when they improve understanding.",
        code: "def normalize(text):\n    return text.strip().casefold()\n\nnames = [\" Ari \", \"MINA\"]\nprint(list(map(normalize, names)))",
      },
    ],
    facts: [
      "A lambda expression contains one expression and returns its value.",
      "A named def is clearer for complex or reusable logic.",
      "map applies a function to each item in an iterable.",
      "filter keeps items whose predicate evaluates to true.",
      "map and filter return lazy iterators in Python 3.",
      "A list comprehension can express a simple map operation clearly.",
      "A comprehension condition can express a simple filtering operation.",
      "A key function tells sorted how to compare each item.",
      "Higher-order functions accept or return functions.",
      "Named functions improve readability when logic needs explanation.",
    ],
    predictions: [
      ["print(list(map(lambda x: x + 1, [1, 2])))", "[2, 3]"],
      ["print(list(filter(lambda x: x > 2, [1, 3, 2, 4])))", "[3, 4]"],
      ['print(sorted(["pear", "fig", "apple"], key=len))', "['fig', 'pear', 'apple']"],
      ["print(list(map(str, [1, 2])))", "['1', '2']"],
      ["print(list(filter(None, [0, 1, '', 'x'])))", "[1, 'x']"],
      ["print((lambda x: x * 3)(4))", "12"],
      ["print(sum(map(int, ['2', '3'])))", "5"],
      ["print(list(map(len, ['a', 'abcd'])))", "[1, 4]"],
      ["print(list(filter(lambda x: x % 2, range(5))))", "[1, 3]"],
      ['print(sorted([("b", 2), ("a", 3)], key=lambda row: row[1]))', "[('b', 2), ('a', 3)]"],
    ],
    exercises: [
      ["Convert values", "prices = [3, 5, 8]", "Create a list of prices including 10% tax.", "Use a comprehension or map with a lambda.", "prices = [3, 5, 8]\nwith_tax = list(map(lambda price: round(price * 1.1, 2), prices))\nprint(with_tax)"],
      ["Filter active users", 'users = [{"name": "Ari", "active": True}, {"name": "Jo", "active": False}]', "Create a list of active user names.", "Use a comprehension with an if condition.", 'users = [{"name": "Ari", "active": True}, {"name": "Jo", "active": False}]\nactive_names = [user["name"] for user in users if user["active"]]\nprint(active_names)'],
      ["Sort with a named key", 'records = [{"name": "Jo", "score": 81}, {"name": "Ari", "score": 94}]', "Define a named key function and sort records by score descending.", "Return the negative score from the key function.", 'records = [{"name": "Jo", "score": 81}, {"name": "Ari", "score": 94}]\ndef score_key(record):\n    return -record["score"]\nprint(sorted(records, key=score_key))'],
    ],
  },
  {
    title: "Regular expressions",
    intro:
      "Recognize text patterns for validation, searching, extraction, and replacement with Python's re module.",
    sections: [
      {
        heading: "Patterns describe text shapes",
        body: "A regular expression is a compact language for matching text. Use raw strings such as `r\"\\d+\"` so Python does not consume backslashes first. `\\d` matches a digit, `+` means one or more, and anchors such as `^` and `$` constrain the whole string.",
        code: 'import re\n\ntext = "Order 381 is ready"\nmatch = re.search(r"\\d+", text)\nprint(match.group() if match else "No number")',
      },
      {
        heading: "Search, match, and fullmatch differ",
        body: "`re.search()` finds a match anywhere. `re.match()` checks from the start. `re.fullmatch()` requires the entire string to fit the pattern and is often useful for simple format validation. Real identity validation needs more than a regex.",
        code: 'import re\n\npattern = r"[A-Z]{2}\\d{4}"\nprint(bool(re.fullmatch(pattern, "AB1234")))\nprint(bool(re.fullmatch(pattern, "xAB1234")))',
      },
      {
        heading: "Capture and replace carefully",
        body: "Parentheses create capture groups; named groups can make extracted fields clearer. `re.sub()` replaces matching text. Regexes can become difficult to maintain, so prefer ordinary string methods for simple tasks.",
        code: 'import re\n\nmatch = re.fullmatch(r"(?P<area>\\d{3})-(?P<line>\\d{4})", "555-0123")\nif match:\n    print(match.group("area"), match.group("line"))',
      },
    ],
    facts: [
      "A raw string helps represent backslashes in a regex pattern.",
      "The regex token \\d matches a digit.",
      "The plus quantifier means one or more repetitions.",
      "The star quantifier means zero or more repetitions.",
      "The caret anchor matches the start of a string.",
      "The dollar anchor matches the end of a string.",
      "re.search looks for a match anywhere in the input.",
      "re.fullmatch requires the entire input to match the pattern.",
      "Parentheses create capturing groups.",
      "Simple string methods are preferable to regex when they suffice.",
    ],
    predictions: [
      ['import re\nprint(re.findall(r"\\d+", "a12b3"))', "['12', '3']"],
      ['import re\nprint(bool(re.fullmatch(r"\\d{3}", "123")))', "True"],
      ['import re\nprint(bool(re.fullmatch(r"\\d{3}", "12")))', "False"],
      ['import re\nprint(re.sub(r"\\s+", "-", "a b  c"))', "a-b-c"],
      ['import re\nprint(re.search(r"cat", "a cat").group())', "cat"],
      ['import re\nprint(re.findall(r"[A-Z]", "PyTHon"))', "['P', 'T', 'H']"],
      ['import re\nprint(re.findall(r"\\w+", "one-two"))', "['one', 'two']"],
      ['import re\nprint(re.fullmatch(r"ab", "zab") is None)', "True"],
      ['import re\nprint(re.findall(r"\\d+", "no digits"))', "[]"],
      ['import re\nprint(re.sub(r"cat", "dog", "cat nap"))', "dog nap"],
    ],
    exercises: [
      ["Extract numbers", 'text = "Room 12, floor 3"', "Extract every sequence of digits.", "Use re.findall with a digit quantifier.", 'import re\ntext = "Room 12, floor 3"\nprint(re.findall(r"\\d+", text))'],
      ["Validate a course code", 'code = "CS2040"', "Require two uppercase letters followed by four digits and a full-string match.", "Use character classes, quantifiers, and fullmatch.", 'import re\ncode = "CS2040"\npattern = r"[A-Z]{2}\\d{4}"\nprint("Valid" if re.fullmatch(pattern, code) else "Invalid")'],
      ["Parse a simple record", 'line = "Mina,92,passed"', "Capture the name, score, and status as separate fields.", "Use named groups and fullmatch; handle a missing match.", 'import re\nline = "Mina,92,passed"\npattern = r"(?P<name>[^,]+),(?P<score>\\d+),(?P<status>\\w+)"\nmatch = re.fullmatch(pattern, line)\nif match:\n    print(match.groupdict())\nelse:\n    print("Invalid record")'],
    ],
  },
  {
    title: "CSV data and tabular workflows",
    intro:
      "Read and write structured rows safely, handle headers, and calculate summaries from CSV files.",
    sections: [
      {
        heading: "CSV is more than splitting commas",
        body: "Fields can contain quoted commas, quotes, or newlines, so do not parse general CSV with `line.split(\",\")`. Python's csv module handles quoting rules. Open CSV files with `newline=\"\"` and an explicit encoding.",
        code: 'import csv\nfrom pathlib import Path\n\nwith Path("people.csv").open(newline="", encoding="utf-8") as file:\n    for row in csv.reader(file):\n        print(row)',
      },
      {
        heading: "Use DictReader for named fields",
        body: "`csv.DictReader` maps each row to values using the header fields. Validate required fields and convert numeric text explicitly; CSV values are strings. Do not assume input files are complete or correctly formatted.",
        code: 'import csv\n\nrows = [{"name": "Ari", "score": 90}]\nfor row in rows:\n    print(row["name"], int(row["score"]))',
      },
      {
        heading: "Write reproducible reports",
        body: "`csv.DictWriter` writes dictionaries with a declared field order. Write a header once, then rows. Use UTF-8 so non-ASCII names remain portable. For a real report, handle errors and document how missing values are treated.",
        code: 'import csv\nfrom pathlib import Path\n\nfields = ["name", "score"]\nwith Path("report.csv").open("w", newline="", encoding="utf-8") as file:\n    writer = csv.DictWriter(file, fieldnames=fields)\n    writer.writeheader()\n    writer.writerow({"name": "Mina", "score": 96})',
      },
    ],
    facts: [
      "CSV fields may contain quoted commas, so splitting on comma is unsafe.",
      "The csv module understands standard CSV quoting rules.",
      "Open CSV text files with newline set to an empty string.",
      "Specify a text encoding such as UTF-8 when opening CSV files.",
      "csv.reader returns rows as sequences of text fields.",
      "csv.DictReader uses header names as keys for each row.",
      "CSV values are text and need explicit numeric conversion.",
      "csv.DictWriter writes dictionaries using declared field names.",
      "writeheader writes a header row for a DictWriter.",
      "Validate required fields because a CSV file may be incomplete.",
    ],
    predictions: [
      ["import csv\nprint(next(csv.reader(['a,b'])))", "['a', 'b']"],
      ['import csv\nprint(next(csv.reader([\'"a,b",c\'])))', "['a,b', 'c']"],
      ["import csv\nprint(list(csv.reader([])))", "[]"],
      ["import csv\nrow = next(csv.DictReader(['name,score', 'Ari,90']))\nprint(row['name'])", "Ari"],
      ["import csv\nprint(next(csv.reader(['a,,c'])))", "['a', '', 'c']"],
      ["import csv\nprint(next(csv.reader(['\"a\"\"b\",c'])))", "['a\"b', 'c']"],
      ["import csv\nprint(list(csv.reader(['x\\ny,z'])))", "[['x'], ['y', 'z']]"],
      ["import csv\nprint(int(next(csv.reader(['42']))[0]) + 1)", "43"],
      ["import csv\nprint(next(csv.reader(['one;two']), []))", "['one;two']"],
      ["import csv\nprint(list(csv.DictReader(['x,y', '1,2']))[0])", "{'x': '1', 'y': '2'}"],
    ],
    exercises: [
      ["Read rows", "rows = [[\"name\", \"score\"], [\"Ari\", \"84\"], [\"Mina\", \"95\"]]", "Convert score strings to integers and print each student's score.", "Skip the header row and convert the second field.", 'rows = [["name", "score"], ["Ari", "84"], ["Mina", "95"]]\nfor name, score in rows[1:]:\n    print(name, int(score))'],
      ["Summarize records", 'records = [{"name": "Ari", "score": "84"}, {"name": "Mina", "score": "96"}]', "Calculate the mean score from DictReader-like dictionaries.", "Convert each score before adding.", 'records = [{"name": "Ari", "score": "84"}, {"name": "Mina", "score": "96"}]\nscores = [int(row["score"]) for row in records]\nprint(sum(scores) / len(scores))'],
      ["Write a report", 'rows = [{"name": "Ari", "score": 84}, {"name": "Mina", "score": 96}]', "Write a CSV header and rows to a file, then read them back.", "Use DictWriter/DictReader with newline=''.", 'import csv\nfrom pathlib import Path\npath = Path("scores.csv")\nfields = ["name", "score"]\nwith path.open("w", newline="", encoding="utf-8") as file:\n    writer = csv.DictWriter(file, fieldnames=fields)\n    writer.writeheader()\n    writer.writerows([{"name": "Ari", "score": 84}, {"name": "Mina", "score": 96}])\nwith path.open(newline="", encoding="utf-8") as file:\n    print(list(csv.DictReader(file)))'],
    ],
  },
  {
    title: "SQLite databases",
    intro:
      "Store structured records in SQLite, use parameterized SQL, and commit or roll back changes deliberately.",
    sections: [
      {
        heading: "Tables store related records",
        body: "A relational database stores rows in tables with defined columns. SQL describes queries and changes. SQLite is included with Python and is useful for local applications, prototypes, and learning relational concepts.",
        code: "import sqlite3\n\nconnection = sqlite3.connect(\":memory:\")\nconnection.execute(\"CREATE TABLE students (name TEXT, score INTEGER)\")\nconnection.close()",
      },
      {
        heading: "Parameterize values",
        body: "Never build SQL by concatenating user-provided values. Use placeholders and pass values separately; this protects query structure and avoids SQL injection. Table and column names are identifiers and generally require different handling from values.",
        code: 'connection.execute("INSERT INTO students VALUES (?, ?)", ("Ari", 91))\nrows = connection.execute("SELECT name, score FROM students WHERE score >= ?", (80,))\nprint(rows.fetchall())',
      },
      {
        heading: "Manage transactions and connections",
        body: "A transaction groups changes that should succeed or fail together. Commit successful changes or roll them back. Use context management and close connections when finished; store only data the application actually needs.",
        code: "with connection:\n    connection.execute(\n        \"UPDATE students SET score = ? WHERE name = ?\",\n        (95, \"Ari\"),\n    )",
      },
    ],
    facts: [
      "A relational table stores rows organized by columns.",
      "SQLite is available in Python through the sqlite3 standard-library module.",
      "A parameter placeholder separates SQL structure from data values.",
      "User values should not be concatenated into SQL strings.",
      "Parameterized queries help prevent SQL injection.",
      "A SELECT query reads rows from a table.",
      "fetchall returns all remaining rows from a cursor.",
      "A transaction groups database changes into a unit.",
      "A transaction should be committed when its changes succeed.",
      "Database connections should be closed when no longer needed.",
    ],
    predictions: [
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x integer)")\nprint(c.execute("select count(*) from t").fetchone())', "(0,)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x integer)")\nc.execute("insert into t values (?)",(4,))\nprint(c.execute("select x from t").fetchone())', "(4,)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x integer)")\nc.executemany("insert into t values (?)",[(2,),(3,)])\nprint(c.execute("select sum(x) from t").fetchone())', "(5,)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x text)")\nc.execute("insert into t values (?)",("Ari",))\nprint(c.execute("select x from t").fetchone()[0])', "Ari"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x integer)")\nc.executemany("insert into t values (?)",[(1,),(3,),(2,)])\nprint(c.execute("select x from t order by x").fetchall())', "[(1,), (2,), (3,)]"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x integer)")\nprint(c.execute("select 2 + 3").fetchone())', "(5,)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nprint(c.execute("select upper(?)",("python",)).fetchone())', "('PYTHON',)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nprint(c.execute("select 9 > ?",(4,)).fetchone())', "(1,)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nc.execute("create table t (x integer)")\nc.execute("insert into t values (?)",(1,))\nc.execute("delete from t")\nprint(c.execute("select count(*) from t").fetchone())', "(0,)"],
      ['import sqlite3\nc=sqlite3.connect(":memory:")\nprint(c.execute("select ?",("safe",)).fetchone())', "('safe',)"],
    ],
    exercises: [
      ["Create and query", "Create a table for courses, insert two rows with parameters, and query them.", "Use CREATE TABLE, placeholders, and fetchall().", "Never place values inside the SQL text.", 'import sqlite3\nconnection = sqlite3.connect(":memory:")\nconnection.execute("CREATE TABLE courses (title TEXT, credits INTEGER)")\nconnection.executemany("INSERT INTO courses VALUES (?, ?)", [("Python", 3), ("Math", 4)])\nprint(connection.execute("SELECT title, credits FROM courses").fetchall())\nconnection.close()'],
      ["Filter a table", "Store student names and scores, then select those scoring 80 or above.", "Use WHERE score >= ? and pass 80 separately.", 'import sqlite3\nconnection = sqlite3.connect(":memory:")\nconnection.execute("CREATE TABLE students (name TEXT, score INTEGER)")\nconnection.executemany("INSERT INTO students VALUES (?, ?)", [("Ari", 76), ("Mina", 92)])\nrows = connection.execute("SELECT name FROM students WHERE score >= ?", (80,)).fetchall()\nprint(rows)\nconnection.close()'],
      ["Transaction exercise", "Insert a batch and update one score inside a transaction, then query the final rows.", "Use a connection context manager and parameterized statements.", 'import sqlite3\nconnection = sqlite3.connect(":memory:")\nconnection.execute("CREATE TABLE students (name TEXT, score INTEGER)")\nwith connection:\n    connection.executemany("INSERT INTO students VALUES (?, ?)", [("Ari", 76), ("Mina", 92)])\n    connection.execute("UPDATE students SET score = ? WHERE name = ?", (80, "Ari"))\nprint(connection.execute("SELECT name, score FROM students ORDER BY name").fetchall())\nconnection.close()'],
    ],
  },
  {
    title: "Command-line programs and arguments",
    intro:
      "Design usable command-line tools with arguments, clear exits, and deliberate input/output behavior.",
    sections: [
      {
        heading: "Separate program logic from the interface",
        body: "A command-line interface accepts arguments and displays results in a terminal. Keep calculation functions independent so they can be reused by tests or another interface. Validate arguments and show clear usage instructions.",
        code: "def word_count(text):\n    return len(text.split())\n\nprint(word_count(\"learn Python by building\"))",
      },
      {
        heading: "Use argparse for real arguments",
        body: "`argparse` parses options, converts values, and generates help text. Define arguments with names, types, and descriptions. The `parse_args()` result is a namespace containing the parsed values.",
        code: 'import argparse\n\nparser = argparse.ArgumentParser(description="Count words")\nparser.add_argument("text")\nargs = parser.parse_args(["learn Python"])\nprint(args.text)',
      },
      {
        heading: "Return status and avoid surprises",
        body: "A CLI should write useful errors and return a non-zero status for failure. Avoid mixing program output with diagnostics. Read files only from intended paths and document whether existing files may be overwritten.",
        code: "def main():\n    message = \"Report complete\"\n    print(message)\n\nif __name__ == \"__main__\":\n    main()",
      },
    ],
    facts: [
      "A command-line interface accepts input and options in a terminal.",
      "argparse is Python's standard-library argument parsing module.",
      "ArgumentParser can generate help text from argument definitions.",
      "A positional argument is required unless configured otherwise.",
      "The type argument can convert an argument value.",
      "parse_args returns a namespace with parsed values.",
      "Program logic is easier to test when separated from CLI input/output.",
      "A non-zero exit status conventionally indicates failure.",
      "A CLI should explain how to use invalid arguments.",
      "A CLI should document file overwrite behavior.",
    ],
    predictions: [
      ['import argparse\np=argparse.ArgumentParser()\np.add_argument("--count", type=int, default=2)\na=p.parse_args([])\nprint(a.count)', "2"],
      ['import argparse\np=argparse.ArgumentParser()\np.add_argument("name")\na=p.parse_args(["Mina"])\nprint(a.name)', "Mina"],
      ['import argparse\np=argparse.ArgumentParser()\np.add_argument("--upper", action="store_true")\na=p.parse_args(["--upper"])\nprint(a.upper)', "True"],
      ['import argparse\np=argparse.ArgumentParser()\np.add_argument("--tag", action="append")\na=p.parse_args(["--tag","a","--tag","b"])\nprint(a.tag)', "['a', 'b']"],
      ['import argparse\np=argparse.ArgumentParser()\np.add_argument("n", type=int)\na=p.parse_args(["7"])\nprint(a.n * 2)', "14"],
      ['print(" ".join(["learn", "Python"]))', "learn Python"],
      ['print(len("three words".split()))', "2"],
      ['print("report".upper())', "REPORT"],
      ['print(int("12") + 1)', "13"],
      ['print(" ".join(sorted(["z", "a"])))', "a z"],
    ],
    exercises: [
      ["Count words", "Write word_count(text) that splits whitespace and returns the number of words.", "Test empty text and a sentence with extra spaces.", "The empty string splits to an empty list.", 'def word_count(text):\n    return len(text.split())\n\nprint(word_count(""))\nprint(word_count("learn   Python well"))'],
      ["Parse arguments", "Create an argparse parser with a required filename and an optional integer --limit.", "Give --limit a default and a type.", 'import argparse\n\nparser = argparse.ArgumentParser(description="Preview a file")\nparser.add_argument("filename")\nparser.add_argument("--limit", type=int, default=10)\nargs = parser.parse_args(["notes.txt", "--limit", "3"])\nprint(args.filename, args.limit)'],
      ["Build a testable CLI", "Create main(args) that returns a summary; keep printing in the main guard.", "Pass data into the function instead of reading global arguments inside it.", 'def summarize_words(text):\n    words = text.split()\n    return {"count": len(words), "characters": len(text)}\n\ndef main():\n    result = summarize_words("Python is practical")\n    print(f"Words: {result[\'count\']}, characters: {result[\'characters\']}")\n\nif __name__ == "__main__":\n    main()'],
    ],
  },
  {
    title: "Virtual environments and dependencies",
    intro:
      "Keep project dependencies isolated and reproducible with virtual environments and package tooling.",
    sections: [
      {
        heading: "Why isolate project dependencies?",
        body: "A virtual environment gives a project its own Python interpreter context and installed packages. It prevents one project's dependency changes from unexpectedly affecting another. It does not isolate your operating system or make untrusted code safe.",
        code: "# Create an environment from a terminal:\n# python -m venv .venv\n# Activate it on macOS/Linux:\n# source .venv/bin/activate",
      },
      {
        heading: "Install and record dependencies",
        body: "Use `python -m pip` with the selected interpreter so packages go into the intended environment. A requirements file can record exact versions for reproducible installs; choose and maintain versions deliberately.",
        code: "# Install a dependency into the active environment:\n# python -m pip install requests\n# Record installed package versions:\n# python -m pip freeze > requirements.txt",
      },
      {
        heading: "Keep environments out of version control",
        body: "Commit project configuration and dependency declarations, not the environment directory. Ignore `.venv/`, document the supported Python version, and recreate the environment from a clean checkout to verify setup instructions.",
        code: 'ignored_paths = [".venv/", "__pycache__/"]\nprint("\\n".join(ignored_paths))\n\n# Recreate a clean environment from declared dependencies:\n# python -m pip install -r requirements.txt',
      },
    ],
    facts: [
      "A virtual environment isolates installed Python packages per project.",
      "python -m venv creates a virtual environment.",
      "The active environment's interpreter should run package installation.",
      "python -m pip targets pip for the selected Python interpreter.",
      "A dependency manifest documents project packages.",
      "Pinned versions can make dependency installs more reproducible.",
      "A virtual environment does not isolate operating-system access.",
      "Environment directories should not normally be committed to version control.",
      "A clean install verifies setup instructions.",
      "Python version support should be documented for users.",
    ],
    predictions: [
      ['import sys\nprint(sys.prefix == sys.base_prefix)', "Environment dependent"],
      ['from pathlib import Path\nprint(Path(".venv").name)', ".venv"],
      ['print("requirements.txt".endswith(".txt"))', "True"],
      ['print("requests==2.31.0".split("=="))', "['requests', '2.31.0']"],
      ['print(len(["requests", "pytest"]))', "2"],
      ['print("python -m venv .venv".split()[0])', "python"],
      ['print("a\\nb\\n".splitlines())', "['a', 'b']"],
      ['print(sorted([".venv", "__pycache__"]))', "['.venv', '__pycache__']"],
      ['print("pytest>=8".partition(">="))', "('pytest', '>=', '8')"],
      ['print(".".join(["3", "12", "1"]))', "3.12.1"],
    ],
    exercises: [
      ["Document setup", "Write clear terminal instructions to create, activate, and install dependencies into a virtual environment.", "Use the same interpreter for venv creation and pip.", 'commands = [\n    "python -m venv .venv",\n    "source .venv/bin/activate",\n    "python -m pip install -r requirements.txt",\n]\nfor command in commands:\n    print(command)'],
      ["Validate dependency declarations", "Parse package==version lines and flag entries without a pinned version.", "Use partition('==') and check both fields.", 'requirements = ["requests==2.31.0", "pytest"]\nfor requirement in requirements:\n    name, separator, version = requirement.partition("==")\n    if separator and name and version:\n        print("Pinned:", name, version)\n    else:\n        print("Review version policy:", requirement)'],
      ["Design a reproducible project", "Create a setup checklist including Python version, environment, dependencies, tests, and ignored files.", "Make the checklist executable as a printed list.", 'checklist = [\n    "Document the supported Python version",\n    "Create a project virtual environment",\n    "Install declared dependencies",\n    "Run the automated test suite",\n    "Ignore local environment files",\n]\nfor item in checklist:\n    print("-", item)'],
    ],
  },
  {
    title: "Context managers and decorators",
    intro:
      "Manage resources reliably and understand decorators as reusable function wrappers.",
    sections: [
      {
        heading: "Context managers guarantee cleanup",
        body: "A context manager's `with` block prepares a resource and ensures cleanup when the block exits, including when an exception occurs. Files use this pattern so they are closed reliably.",
        code: 'from pathlib import Path\n\nwith Path("note.txt").open("w", encoding="utf-8") as file:\n    file.write("Saved safely")',
      },
      {
        heading: "A decorator wraps a function",
        body: "A decorator receives a function and returns a replacement, often adding behavior before or after a call. `@decorator` is concise syntax for applying that wrapper. Use `functools.wraps` so metadata from the original function is preserved.",
        code: "from functools import wraps\n\ndef announce(function):\n    @wraps(function)\n    def wrapper(*args, **kwargs):\n        print(\"Starting\")\n        return function(*args, **kwargs)\n    return wrapper",
      },
      {
        heading: "Keep wrappers transparent",
        body: "A good decorator preserves the wrapped function's result, arguments, exceptions, and metadata unless intentionally changing them. Do not add a decorator just to hide a simple two-line operation; clarity matters.",
        code: '@announce\ndef greet(name):\n    return f"Hello, {name}"\n\nprint(greet("Ari"))',
      },
    ],
    facts: [
      "A context manager manages setup and cleanup around a with block.",
      "A file context manager closes its file when its block ends.",
      "Cleanup occurs when a with block exits normally or through an exception.",
      "A decorator accepts a function and returns a callable wrapper.",
      "The @decorator syntax applies a decorator to the function below it.",
      "A wrapper should usually return the wrapped function's result.",
      "functools.wraps preserves useful wrapped-function metadata.",
      "A decorator can accept and forward positional arguments.",
      "A decorator can accept and forward keyword arguments.",
      "Use decorators only when the abstraction improves clarity.",
    ],
    predictions: [
      ['from contextlib import nullcontext\nwith nullcontext(5) as value:\n    print(value)', "5"],
      ['from contextlib import nullcontext\nwith nullcontext("ok") as value:\n    print(value.upper())', "OK"],
      ["def double(x):\n    return x * 2\nprint(double(4))", "8"],
      ["def wrap(fn):\n    def inner():\n        return fn() + 1\n    return inner\nprint(wrap(lambda: 4)())", "5"],
      ['from functools import wraps\nprint(callable(wraps))', "True"],
      ["with open('/dev/null') as f:\n    print(f.closed)\nprint(f.closed)", "True\nTrue"],
      ['print("a".upper())', "A"],
      ["def greet(name='Ari'):\n    return name\nprint(greet())", "Ari"],
      ["def add(a, b):\n    return a + b\nprint(add(*(2, 3)))", "5"],
      ['print({**{"a": 1}, "b": 2})', "{'a': 1, 'b': 2}"],
    ],
    exercises: [
      ["Trace a wrapper", "Write a decorator that prints `Calling` then returns the wrapped function result.", "Use *args and **kwargs.", 'from functools import wraps\n\ndef announce(function):\n    @wraps(function)\n    def wrapper(*args, **kwargs):\n        print("Calling")\n        return function(*args, **kwargs)\n    return wrapper\n\n@announce\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))'],
      ["Add a timing wrapper", "Create a decorator using time.perf_counter() that reports elapsed seconds.", "Capture start and end around the function call; use finally if reporting after exceptions matters.", 'from functools import wraps\nfrom time import perf_counter\n\ndef timed(function):\n    @wraps(function)\n    def wrapper(*args, **kwargs):\n        start = perf_counter()\n        try:\n            return function(*args, **kwargs)\n        finally:\n            print(f"Elapsed: {perf_counter() - start:.6f}s")\n    return wrapper'],
      ["Use a context manager", "Open a file, write lines, then read it back in a second with block.", "Specify UTF-8 and let each with block close the file.", 'from pathlib import Path\npath = Path("context-demo.txt")\nwith path.open("w", encoding="utf-8") as file:\n    file.write("first\\nsecond\\n")\nwith path.open(encoding="utf-8") as file:\n    print(file.read())'],
    ],
  },
  {
    title: "Type hints, dataclasses, and model design",
    intro:
      "Describe data shapes with annotations and use dataclasses for concise record-like objects.",
    sections: [
      {
        heading: "Annotations communicate expected types",
        body: "Type hints document expected values and help static analysis tools catch mismatches. Python does not enforce ordinary annotations at runtime. Use built-in types and `list[str]`, `dict[str, int]`, or unions where they clarify an interface.",
        code: "def average(values: list[float]) -> float:\n    if not values:\n        raise ValueError(\"values must not be empty\")\n    return sum(values) / len(values)",
      },
      {
        heading: "Use dataclasses for data-focused records",
        body: "`@dataclass` generates common methods such as initialization and representation. Annotate fields. Use `field(default_factory=list)` for mutable defaults so each instance receives its own list.",
        code: "from dataclasses import dataclass, field\n\n@dataclass\nclass Course:\n    title: str\n    students: list[str] = field(default_factory=list)",
      },
      {
        heading: "Keep validation explicit",
        body: "Type hints describe intended types but do not validate untrusted input. Validate data at boundaries, use domain-specific methods for invariants, and keep representation separate from serialization when formats have requirements.",
        code: "from dataclasses import dataclass\n\n@dataclass\nclass Score:\n    value: float\n\n    def __post_init__(self):\n        if not 0 <= self.value <= 100:\n            raise ValueError(\"score must be from 0 to 100\")",
      },
    ],
    facts: [
      "Type annotations communicate intended types to readers and tools.",
      "Python does not automatically enforce ordinary type hints at runtime.",
      "list[str] describes a list whose items are intended to be strings.",
      "A function return annotation appears after an arrow.",
      "The dataclass decorator generates common record methods.",
      "Dataclass fields need annotations to be treated as fields.",
      "field(default_factory=list) creates a separate list for each instance.",
      "Mutable default objects should not be shared unintentionally between instances.",
      "__post_init__ can validate an initialized dataclass instance.",
      "Input validation remains necessary even when values have type hints.",
    ],
    predictions: [
      ['from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int\nprint(Point(2, 3))', "Point(x=2, y=3)"],
      ['from dataclasses import dataclass, field\n@dataclass\nclass A:\n    items: list = field(default_factory=list)\na=A(); a.items.append(1)\nprint(a.items)', "[1]"],
      ["def f(x: int) -> int:\n    return x + 1\nprint(f(2))", "3"],
      ['print(isinstance("x", str))', "True"],
      ['from typing import Optional\nprint(Optional[int] is not None)', "True"],
      ['from dataclasses import dataclass\n@dataclass\nclass Item:\n    name: str\nprint(Item("pen").name)', "pen"],
      ["print(sum([1, 2, 3]))", "6"],
      ['from dataclasses import dataclass\n@dataclass\nclass A:\n    x: int\nprint(A(1) == A(1))', "True"],
      ['from dataclasses import dataclass\n@dataclass\nclass A:\n    x: int\nprint(A.__annotations__)', "{'x': <class 'int'>}"],
      ['print(type(3.0).__name__)', "float"],
    ],
    exercises: [
      ["Type a function", "Add parameter and return annotations to a function that converts Celsius to Fahrenheit.", "Annotate numeric values as float.", "def to_fahrenheit(celsius: float) -> float:\n    return celsius * 9 / 5 + 32\n\nprint(to_fahrenheit(20))"],
      ["Model a course", "Create a dataclass with a title, an optional instructor, and an independent students list.", "Use field(default_factory=list) for students.", 'from dataclasses import dataclass, field\n\n@dataclass\nclass Course:\n    title: str\n    instructor: str = "TBA"\n    students: list[str] = field(default_factory=list)\n\npython = Course("Python")\nprint(python)'],
      ["Validate a score model", "Create a Score dataclass that rejects values outside 0 through 100.", "Validate in __post_init__ and raise ValueError.", 'from dataclasses import dataclass\n\n@dataclass\nclass Score:\n    value: float\n\n    def __post_init__(self):\n        if not 0 <= self.value <= 100:\n            raise ValueError("score must be from 0 to 100")\n\nprint(Score(92))'],
    ],
  },
  {
    title: "HTTP APIs in practice",
    intro:
      "Make a safe HTTP request, inspect response status and JSON, and handle timeouts and failures.",
    sections: [
      {
        heading: "Understand request and response",
        body: "An HTTP request has a method, URL, headers, and sometimes a body. A response has a status code, headers, and body. GET is commonly used to retrieve data; POST commonly submits data. Follow each API's documented contract.",
        code: 'from urllib.request import Request\n\nrequest = Request("https://example.com/data", headers={"Accept": "application/json"})\nprint(request.method)',
      },
      {
        heading: "Use an HTTP client with timeouts",
        body: "A real network request may fail because of DNS, connectivity, a timeout, or server error. Use a timeout, check the status, decode using the declared encoding, and validate JSON structure before consuming it.",
        code: "# Typical request workflow:\n# response = urlopen(request, timeout=10)\n# with response:\n#     data = json.loads(response.read())\n# Validate the fields before using them.",
      },
      {
        heading: "Treat remote data as untrusted",
        body: "Remote responses are external input. Never assume a field exists or has the desired type. Handle HTTPError and URLError deliberately, avoid leaking credentials, and respect rate limits and service terms.",
        code: 'payload = {"status": "ok", "items": [1, 2]}\nif payload.get("status") == "ok" and isinstance(payload.get("items"), list):\n    print("Received", len(payload["items"]), "items")',
      },
    ],
    facts: [
      "An HTTP request includes a method and a target URL.",
      "A response status code communicates the broad request outcome.",
      "GET is commonly used to retrieve a resource.",
      "POST is commonly used to submit data for processing.",
      "A network timeout bounds how long a client waits.",
      "HTTP status and response data should be checked before use.",
      "JSON parsing does not validate application-specific fields.",
      "Remote data must be treated as untrusted input.",
      "Credentials should not be embedded in source code or logged.",
      "Clients should respect service rate limits and terms.",
    ],
    predictions: [
      ['from urllib.request import Request\nr=Request("https://example.com")\nprint(r.method)', "GET"],
      ['from urllib.parse import urlparse\nprint(urlparse("https://example.com/a").path)', "/a"],
      ['from urllib.parse import urlencode\nprint(urlencode({"q": "python basics"}))', "q=python+basics"],
      ['import json\nprint(json.loads(\'{"ok": true}\')["ok"])', "True"],
      ['import json\nprint(json.loads("[1, 2]")[1])', "2"],
      ['from urllib.error import HTTPError\nprint(issubclass(HTTPError, Exception))', "True"],
      ['from urllib.parse import urljoin\nprint(urljoin("https://x.test/a/", "b"))', "https://x.test/a/b"],
      ['print({"status":"ok"}.get("missing", "unknown"))', "unknown"],
      ['print(isinstance([1,2], list))', "True"],
      ['print("Bearer " + "token".upper())', "Bearer TOKEN"],
    ],
    exercises: [
      ["Encode query parameters", "Build a URL query string for search term `python basics` and page 2.", "Use urllib.parse.urlencode.", 'from urllib.parse import urlencode\nquery = urlencode({"q": "python basics", "page": 2})\nprint(query)'],
      ["Validate a response", "Write a function that validates a JSON-like dictionary has a string status and list results.", "Check both keys and types.", 'def valid_response(data):\n    return (\n        isinstance(data, dict)\n        and isinstance(data.get("status"), str)\n        and isinstance(data.get("results"), list)\n    )\n\nprint(valid_response({"status": "ok", "results": []}))'],
      ["Make a documented request", "Use urllib to request a public JSON endpoint with a timeout and handle HTTP/network errors.", "Use Request, urlopen(..., timeout=...), and JSON parsing.", 'import json\nfrom urllib.request import Request, urlopen\nfrom urllib.error import HTTPError, URLError\n\nrequest = Request("https://example.com/data", headers={"Accept": "application/json"})\ntry:\n    with urlopen(request, timeout=10) as response:\n        if response.status != 200:\n            raise RuntimeError(f"Unexpected status: {response.status}")\n        data = json.loads(response.read())\nexcept (HTTPError, URLError, TimeoutError) as error:\n    print(f"Request failed: {error}")\nelse:\n    print(data)'],
    ],
  },
  {
    title: "Python security fundamentals",
    intro:
      "Protect programs by treating input as untrusted, keeping secrets out of code, and using safe data access patterns.",
    sections: [
      {
        heading: "Validate at trust boundaries",
        body: "User input, uploaded files, API responses, and database values can be malformed or malicious. Validate type, size, format, and allowed values before using data. Validation should enforce the actual application rules rather than only checking that text looks plausible.",
        code: 'def validate_quantity(value):\n    if not isinstance(value, int) or value < 0:\n        raise ValueError("quantity must be a non-negative integer")\n    return value',
      },
      {
        heading: "Use safe APIs instead of string-built commands",
        body: "Parameterize SQL values. For subprocess calls, pass an argument list rather than a shell command string when possible. Avoid `eval()` on untrusted input. Escape output for its destination, and do not assume one type of validation protects every context.",
        code: '# Safe database parameter pattern:\n# cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))\n# Avoid building SQL with string concatenation.',
      },
      {
        heading: "Protect credentials and sensitive data",
        body: "Load secrets from a protected environment or secret manager, limit their permissions, rotate compromised values, and never commit or log them. Use HTTPS for network traffic, keep dependencies updated, and collect only the data the application needs.",
        code: 'import os\n\napi_key = os.environ.get("SERVICE_API_KEY")\nif not api_key:\n    raise RuntimeError("SERVICE_API_KEY is not configured")\nprint("Secret loaded:", bool(api_key))',
      },
    ],
    facts: [
      "External input should be treated as untrusted.",
      "Validation should enforce the application's actual business rules.",
      "Parameterized SQL keeps values separate from query structure.",
      "eval executes Python expressions and must not receive untrusted input.",
      "Subprocess argument lists avoid unnecessary shell interpretation.",
      "Output escaping depends on the destination context.",
      "Secrets should not be committed into source control.",
      "Secrets should not be written to logs or error messages.",
      "Environment variables can provide configuration but still need protection.",
      "Use least privilege and rotate credentials if they are exposed.",
    ],
    predictions: [
      ['print("SERVICE_API_KEY" in {})', "False"],
      ['print(bool(os.environ.get("PATH")) if "os" in globals() else "import os first")', "import os first"],
      ['print(isinstance(3, int))', "True"],
      ['print("x" in {"x": 1})', "True"],
      ['print("SELECT ?".replace("?", "parameter"))', "SELECT parameter"],
      ['import shlex\nprint(shlex.quote("two words"))', "'two words'"],
      ['print("secret".upper() != "secret")', "True"],
      ['print("https".endswith("s"))', "True"],
      ['print(["python", "-m", "module"])', "['python', '-m', 'module']"],
      ['print(len("".encode("utf-8")))', "0"],
    ],
    exercises: [
      ["Validate a quantity", "Write a validator that rejects bool, negative values, and non-integers.", "Remember bool is a subclass of int; use type(value) is int for this strict rule.", 'def validate_quantity(value):\n    if type(value) is not int or value < 0:\n        raise ValueError("quantity must be a non-negative integer")\n    return value\n\nprint(validate_quantity(3))'],
      ["Load a secret safely", "Read a required API key from an environment variable and fail clearly if missing.", "Use os.environ.get(); never print the secret itself.", 'import os\n\napi_key = os.environ.get("SERVICE_API_KEY")\nif not api_key:\n    raise RuntimeError("SERVICE_API_KEY is not configured")\nprint("API key is configured")'],
      ["Use parameterized SQL", "Query a SQLite table by a user-provided name with a placeholder.", "Pass values in a tuple; do not concatenate them into SQL.", 'import sqlite3\nconnection = sqlite3.connect(":memory:")\nconnection.execute("CREATE TABLE users (name TEXT)")\nconnection.execute("INSERT INTO users VALUES (?)", ("Ari",))\nrequested_name = "Ari"\nrows = connection.execute("SELECT name FROM users WHERE name = ?", (requested_name,)).fetchall()\nprint(rows)\nconnection.close()'],
    ],
  },
  {
    title: "Advanced problem-solving workshop",
    intro:
      "Combine decomposition, invariants, edge cases, and testable functions to solve unfamiliar problems.",
    sections: [
      {
        heading: "Restate the problem and constraints",
        body: "Before coding, clarify inputs, outputs, constraints, and edge cases. Write a small example by hand. Decide what should happen for empty input, duplicates, ties, invalid values, and very large values.",
        code: "def normalize_scores(scores):\n    if not scores:\n        return []\n    maximum = max(scores)\n    if maximum == 0:\n        return [0 for _ in scores]\n    return [score / maximum for score in scores]",
      },
      {
        heading: "Choose an invariant and data structure",
        body: "An invariant is a property that remains true while an algorithm runs. State what your variables mean after each iteration. Choose a list for ordered data, a set for uniqueness or membership, and a dictionary for key-based lookup.",
        code: 'seen = set()\nduplicates = set()\nfor value in [2, 3, 2, 4, 3]:\n    if value in seen:\n        duplicates.add(value)\n    seen.add(value)\nprint(duplicates)',
      },
      {
        heading: "Test boundaries and explain tradeoffs",
        body: "Use examples that target boundaries and failure modes, not only the happy path. Verify correctness before optimizing, then discuss time and space costs. A professional solution is one others can understand, test, and maintain.",
        code: "def binary_contains(values, target):\n    low, high = 0, len(values)\n    while low < high:\n        middle = (low + high) // 2\n        if values[middle] < target:\n            low = middle + 1\n        else:\n            high = middle\n    return low < len(values) and values[low] == target",
      },
    ],
    facts: [
      "A problem statement should be clarified into inputs and outputs.",
      "Constraints help determine which algorithm is appropriate.",
      "An invariant describes a property maintained during an algorithm.",
      "A set can track items already observed.",
      "A dictionary can store a relationship from key to value.",
      "Boundary cases include empty input and a single item.",
      "Duplicate and tie behavior should be specified.",
      "Binary search requires sorted input.",
      "Correctness should be checked before optimizing.",
      "A maintainable solution should explain important tradeoffs.",
    ],
    predictions: [
      ["print(max([3, 7, 2]))", "7"],
      ["print(sorted(set([2, 1, 2])))", "[1, 2]"],
      ["print(sum([1, 2, 3]))", "6"],
      ["print([x for x in range(5) if x % 2 == 0])", "[0, 2, 4]"],
      ["print(all([True, True]))", "True"],
      ["print(any([False, True]))", "True"],
      ["print(min([], default=0))", "0"],
      ["print({x: x*x for x in range(3)})", "{0: 0, 1: 1, 2: 4}"],
      ["print(list(reversed([1, 2, 3])))", "[3, 2, 1]"],
      ["print(sum(1 for _ in [4, 5, 6]))", "3"],
    ],
    exercises: [
      ["Specify edge cases", "Write a function that returns the second-largest distinct number or raises ValueError when it does not exist.", "Use a set, sort, then check its length.", "def second_largest(values):\n    unique = sorted(set(values))\n    if len(unique) < 2:\n        raise ValueError(\"need at least two distinct values\")\n    return unique[-2]\n\nprint(second_largest([4, 1, 4, 3]))"],
      ["Find duplicates", "Return each duplicated value once while preserving the order it first becomes a duplicate.", "Track seen and reported values separately.", "def duplicates_in_order(values):\n    seen = set()\n    reported = set()\n    result = []\n    for value in values:\n        if value in seen and value not in reported:\n            result.append(value)\n            reported.add(value)\n        seen.add(value)\n    return result\n\nprint(duplicates_in_order([2, 3, 2, 4, 3, 2]))"],
      ["Implement binary search", "Implement binary_contains() for a sorted list and test present, absent, and empty cases.", "Keep the active search interval half-open: [low, high).", "def binary_contains(values, target):\n    low, high = 0, len(values)\n    while low < high:\n        middle = (low + high) // 2\n        if values[middle] < target:\n            low = middle + 1\n        else:\n            high = middle\n    return low < len(values) and values[low] == target\n\nassert binary_contains([1, 3, 5, 7], 5)\nassert not binary_contains([1, 3, 5, 7], 4)\nassert not binary_contains([], 1)\nprint('All cases passed')"],
    ],
  },
];

function makeQuizzes(facts, topicTitle) {
  return facts.map((fact, index) => {
    const statement = fact[0].toLowerCase() + fact.slice(1);
    const distractors = [
      `It is not true that ${statement}`,
      `The opposite is correct: ${statement}`,
    ];
    const correctPosition = index % 3;
    const options = [...distractors];
    options.splice(correctPosition, 0, fact);
    return {
      q: `Which statement about ${topicTitle} is accurate?`,
      options,
      answer: correctPosition,
      why: fact,
    };
  });
}

function makePredictProblems(predictions) {
  return predictions.map(([code, output], index) => ({
    title: `Predict the output ${index + 1}`,
    code,
    output,
    why: `Trace the expression in order and apply the rules taught in this topic.`,
  }));
}

export const advancedLessons = topicData.slice(0, 15).map((topic, index) => ({
  id: `v3-${String(index + 25).padStart(2, "0")}`,
  number: String(index + 25).padStart(2, "0"),
  title: topic.title,
  intro: topic.intro,
  example: topic.sections[0].code,
  sections: topic.sections,
  exercises: topic.exercises.map(
    (exercise) => {
      if (exercise.length === 5) {
        const [title, second, third, fourth, solution] = exercise;
        if (
          second.includes("\n") ||
          /^(?:#|from |import |def |class |[A-Za-z_]\w*\s*=|print\(|with |for |if )/.test(
            second.trim(),
          )
        ) {
          return {
            title,
            starter: second,
            task: third,
            hint: fourth,
            solution,
          };
        }
        return {
          title,
          task: second,
          starter: `# TODO: ${second}\n`,
          hint: `${third} ${fourth}`,
          solution,
        };
      }
      const [title, task, hint, solution] = exercise;
      return {
        title,
        task,
        starter: `# TODO: ${task}\n`,
        hint,
        solution,
      };
    },
  ),
  quizzes: makeQuizzes(topic.facts, topic.title),
  predictProblems: makePredictProblems(topic.predictions).map(
    (problem, problemIndex) => ({
      ...problem,
      explanation: topic.facts[problemIndex],
    }),
  ),
}));
