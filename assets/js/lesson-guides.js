export const lessonGuides = {
  "01": {
    overview:
      "Start by reading Python as a sequence of instructions: values are evaluated, statements run in order, and output helps you inspect what happened. These habits form the foundation for every later chapter.",
    objectives: [
      "Run a Python file and read its output from top to bottom.",
      "Distinguish quoted text from names and calculations.",
      "Use print() to inspect values and test small changes.",
      "Make a prediction before running a short program.",
    ],
    mistakes: [
      "Leaving quotation marks off text makes Python treat it as a variable name.",
      "Python is case-sensitive: print and Print are different names.",
      "A syntax error can stop the file before later statements run.",
    ],
  },
  "02": {
    overview:
      "Variables are names bound to values, not labeled boxes that permanently hold one type. Assignments update a name, and descriptive naming makes calculations easier to check and maintain.",
    objectives: [
      "Read assignment from right to left and update existing values.",
      "Choose legal, descriptive snake_case identifiers.",
      "Use augmented assignment such as += and -=.",
      "Distinguish assignment (=) from comparison (==).",
    ],
    mistakes: [
      "Using = in a condition instead of == confuses assignment with comparison.",
      "Names cannot start with a digit or contain spaces and hyphens.",
      "Reusing names such as list or sum hides useful built-ins.",
    ],
  },
  "03": {
    overview:
      "Numerical code depends on both the operator and the type of its operands. Learn precedence, true division, floor division, remainders, powers, and formatting so the displayed result matches the intended calculation.",
    objectives: [
      "Recognize int and float values and use parentheses to show order.",
      "Choose among /, //, %, and ** for the problem.",
      "Format decimal results for people without changing the stored value.",
      "Know why floating-point values are not exact decimal money values.",
    ],
    mistakes: [
      "The // operator floors; it does not merely truncate toward zero for negatives.",
      "A formatted value such as :.2f changes display, not the underlying number.",
      "Binary floating-point can produce small representation differences.",
    ],
  },
  "04": {
    overview:
      "Strings are immutable sequences of Unicode text. This chapter develops reliable ways to clean, inspect, combine, split, and format text, including zero-based indexing and the start:stop:step slicing rules shared by strings and other sequences.",
    objectives: [
      "Use quotes, escapes, and multiline strings correctly.",
      "Normalize and inspect text with methods such as strip and casefold.",
      "Use indexes, membership, length, and slices to examine text.",
      "Extract prefixes, suffixes, stepped samples, and reversed text with slices.",
      "Build readable output with f-strings.",
    ],
    mistakes: [
      "String methods return new strings; they do not mutate the original.",
      "The final valid index is len(text) - 1; indexing past it raises IndexError.",
      "Slice stops are excluded, so text[1:4] contains indexes 1, 2, and 3.",
      "String slices create new strings; strings cannot be modified by slice assignment.",
      "title() and lower() are transformations, not universal language-aware name rules.",
    ],
  },
  "05": {
    overview:
      "Input is an untrusted text boundary: collect it, normalize it, convert it, validate the program's actual requirements, and respond clearly when it is invalid. The same pattern applies to forms, files, and network data.",
    objectives: [
      "Remember that input() always returns str.",
      "Convert strings with int or float and handle ValueError.",
      "Validate domain rules such as allowed ranges, not just numeric syntax.",
      "Give specific prompts and recoverable error messages.",
    ],
    mistakes: [
      "Calling int(input(...)) can terminate the program on invalid text.",
      "isdigit() excludes negative signs and decimal points.",
      "Successful conversion does not prove a value is sensible, such as a negative age.",
    ],
  },
  "06": {
    overview:
      "Branching translates rules into mutually exclusive paths. Correct results depend on Boolean logic, operator precedence, readable grouping, and checking overlapping cases in the right order.",
    objectives: [
      "Write indented if, elif, and else branches.",
      "Combine comparisons with and, or, and not.",
      "Group complex conditions with parentheses.",
      "Order overlapping ranges from the most specific case to the fallback.",
    ],
    mistakes: [
      "A branch after an earlier matching if/elif is not evaluated.",
      "Using and where either condition is sufficient incorrectly rejects cases.",
      "Chained comparisons such as 0 <= score <= 100 are valid Python.",
    ],
  },
  "07": {
    overview:
      "Loops repeat a block over data or while a condition remains true. You will trace nested loops, draw triangles, pyramids, checkerboards, and hollow rectangles, use break and continue deliberately, reason about loop else, and avoid off-by-one and non-terminating loops.",
    objectives: [
      "Iterate over items directly or use range for a known counting sequence.",
      "Use while only when a changing condition controls repetition.",
      "Trace nested loops as an outer cycle containing complete inner cycles.",
      "Use row and column counts to build visual patterns with nested loops.",
      "Choose break, continue, and loop else with their exact control-flow meanings.",
      "Check loop bounds, progress, and the behavior of empty inputs.",
    ],
    mistakes: [
      "range(stop) excludes stop; a table through 10 needs range(1, 11).",
      "A nested inner loop runs again for each outer-loop iteration.",
      "Put the row newline after the inner loop; printing it inside creates one character per line.",
      "A pyramid row r has height - r leading spaces and 2*r - 1 stars.",
      "break exits only the innermost loop; continue skips to that loop's next iteration.",
      "A while condition that never becomes false creates an infinite loop.",
    ],
  },
  "08": {
    overview:
      "Lists are ordered, mutable sequences. Learn safe indexing, changes in place, common methods, iteration, and detailed slicing—including half-open bounds, steps, shallow copies, slice assignment, deletion, and when to build a separate result rather than changing a list during traversal.",
    objectives: [
      "Create, index, replace, and measure lists.",
      "Choose append, extend, insert, remove, pop, and clear appropriately.",
      "Iterate over values and use enumerate when positions matter.",
      "Use slices to make new outer lists and select sequence regions.",
      "Use negative bounds and steps to select suffixes, samples, and reversed copies.",
      "Replace or delete list regions with slice assignment and del.",
    ],
    mistakes: [
      "Indexing an empty list or past its last element raises IndexError.",
      "append adds one object; extend adds each item from an iterable.",
      "sort() changes a list and returns None; sorted() returns a new list.",
      "Removing items while iterating can skip elements or produce surprising results.",
      "A slice stop is exclusive; use items[:n] for the first n values.",
      "Slice copies are shallow: nested mutable values remain shared.",
      "Extended slice assignment requires a replacement for every selected position.",
    ],
  },
  "09": {
    overview:
      "Collections encode different guarantees. Select tuples for fixed ordered records, sets for unique hashable values and set operations, and mutable lists when ordered items need changing.",
    objectives: [
      "Understand tuple order and immutability, including one-item tuple syntax.",
      "Create sets, test membership, and remove duplicates when order is irrelevant.",
      "Use union, intersection, difference, and symmetric difference.",
      "Choose a collection based on ordering, uniqueness, mutability, and lookup needs.",
    ],
    mistakes: [
      "{} creates an empty dictionary; use set() for an empty set.",
      "Sets do not support positional indexing and should not represent ordered output.",
      "Set elements must be hashable; a list cannot be an element of a set.",
    ],
  },
  "10": {
    overview:
      "Dictionaries model records and lookup tables by mapping unique hashable keys to values. This chapter covers safe lookup, updating, iteration, aggregation, and nested structured data.",
    objectives: [
      "Create, read, update, and remove key-value pairs.",
      "Choose between bracket access, get(), and membership tests.",
      "Iterate over keys, values, or key-value pairs.",
      "Represent multiple records as a list of dictionaries and aggregate them.",
    ],
    mistakes: [
      "A missing key with data[key] raises KeyError; get() does not add a missing key.",
      "Dictionary keys must be hashable; mutable lists cannot be keys.",
      "Changing a dictionary's size while iterating over it is unsafe.",
    ],
  },
  "11": {
    overview:
      "Functions name reusable behavior and define an interface through parameters, arguments, defaults, and return values. Good functions do one job, make dependencies visible, and are easy to test.",
    objectives: [
      "Define and call functions with positional and keyword arguments.",
      "Distinguish parameters from arguments and print from return.",
      "Use default parameters and return values in later calculations.",
      "Write small functions with clear inputs, outputs, and responsibilities.",
    ],
    mistakes: [
      "print() displays a value but does not return it to the caller.",
      "Code inside a function does not run until the function is called.",
      "Avoid mutable default arguments such as items=[]; use None or a factory.",
    ],
  },
  "12": {
    overview:
      "Program decomposition controls complexity: local variables limit accidental coupling, small functions separate responsibilities, and recursion expresses problems that shrink into similar subproblems.",
    objectives: [
      "Distinguish local scope from module-level names.",
      "Pass dependencies explicitly and return results instead of changing globals.",
      "Decompose a task into cohesive functions.",
      "Design recursion with a base case and a smaller recursive step.",
    ],
    mistakes: [
      "A local assignment does not update a global name unless explicitly declared.",
      "Every recursive path must make progress toward a base case.",
      "Deep recursion can exceed Python's recursion limit; a loop may be safer.",
    ],
  },
  "13": {
    overview:
      "Comprehensions build collections from an iterable using an expression and optional filters. Read them left to right, and choose a normal loop when it makes multi-step logic or side effects clearer.",
    objectives: [
      "Transform each item in a list comprehension.",
      "Filter items with conditions and combine multiple filters.",
      "Build set and dictionary comprehensions.",
      "Recognize when a generator expression or explicit loop is clearer.",
    ],
    mistakes: [
      "The expression comes before the for clause in a comprehension.",
      "A comprehension creates a new collection; it does not modify its source list.",
      "Do not use comprehensions just to call print or perform other side effects.",
    ],
  },
  "14": {
    overview:
      "Exceptions communicate failed operations. Read tracebacks, catch only failures you can handle, preserve useful error information, and use cleanup constructs so resources are released reliably.",
    objectives: [
      "Distinguish syntax errors from exceptions raised at runtime.",
      "Read the exception type and message at the end of a traceback.",
      "Use specific except clauses and optional else/finally blocks.",
      "Raise meaningful exceptions for invalid operations.",
    ],
    mistakes: [
      "A bare except can hide bugs and catch failures you did not intend to handle.",
      "Do not use exceptions to silently replace invalid data with a success-looking value.",
      "A finally block runs during normal completion and exception propagation.",
    ],
  },
  "15": {
    overview:
      "Files persist beyond one program run. Use pathlib for paths, specify text encodings, choose read/write/append modes intentionally, and close files through context managers.",
    objectives: [
      "Represent and combine paths with pathlib.Path.",
      "Read and write text with an explicit encoding.",
      "Choose modes carefully and understand overwrite behavior.",
      "Handle missing files and keep paths within intended locations.",
    ],
    mistakes: [
      "Opening with mode w truncates an existing file.",
      "Relative paths resolve from the current working directory, not always the script directory.",
      "Forgetting a context manager can leave a file open after errors.",
    ],
  },
  "16": {
    overview:
      "Modules organize reusable Python code; packages group modules. Imports execute module-level statements, so design clear public names and protect script startup with a main guard.",
    objectives: [
      "Import a module or selected names from the standard library.",
      "Organize related functions in modules and packages.",
      "Avoid circular imports and expensive import-time side effects.",
      "Use main() and the __name__ guard for script entry points.",
    ],
    mistakes: [
      "Naming a file after a standard-library module can shadow that module.",
      "Importing a module runs its top-level code once.",
      "A main guard is __name__ == '__main__' with two underscores on each side.",
    ],
  },
  "17": {
    overview:
      "Classes are useful when related state and behavior form a meaningful object. Learn instance initialization, methods, invariants, and composition without forcing every problem into object-oriented design.",
    objectives: [
      "Define classes, instantiate objects, and initialize instance attributes.",
      "Explain how self connects a method call to its instance.",
      "Keep object state valid through methods and input checks.",
      "Prefer composition or simple functions when they model the problem more clearly.",
    ],
    mistakes: [
      "Instance methods need self as their first parameter.",
      "Instance attributes assigned through self belong to each object; class attributes are shared.",
      "Do not confuse __init__ initialization with manually calling a method on a class.",
    ],
  },
  "18": {
    overview:
      "JSON is a text interchange format, not a Python object dump. Learn the supported value mapping, serialize and parse text or files, and validate data after parsing because valid JSON can still violate your application's rules.",
    objectives: [
      "Map JSON objects, arrays, scalars, booleans, and null to Python values.",
      "Use dumps/loads for strings and dump/load for file objects.",
      "Handle decoding and file errors deliberately.",
      "Validate required keys, types, and allowed values at the boundary.",
    ],
    mistakes: [
      "JSON uses null/true/false; Python uses None/True/False in source code.",
      "Valid JSON can still be missing fields or contain the wrong types.",
      "Sets and arbitrary custom objects are not JSON-serializable by default.",
    ],
  },
  "19": {
    overview:
      "Tests turn expectations into repeatable checks. Reproduce a failure, test public behavior with representative inputs, and include boundary cases so changes do not silently break earlier guarantees.",
    objectives: [
      "Write assertions and test functions with descriptive names.",
      "Separate setup, action, and expected result in a test.",
      "Test normal, boundary, empty, and invalid cases.",
      "Use a debugger or small reproduction to inspect failures rather than guessing.",
    ],
    mistakes: [
      "A test that only repeats implementation details may miss user-visible regressions.",
      "Assertions can be disabled with Python optimization; do not use them for input validation.",
      "Tests should not depend on execution order or shared mutable state.",
    ],
  },
  "20": {
    overview:
      "Professional Python is understandable, predictable, and maintainable. Naming, formatting, documentation, type hints, dependency discipline, and small changes all help a team reason about behavior.",
    objectives: [
      "Use consistent naming, whitespace, and focused functions.",
      "Document behavior, parameters, return values, and important constraints.",
      "Add type hints to communicate intended interfaces.",
      "Prefer clear code and repeatable tooling over clever shortcuts.",
    ],
    mistakes: [
      "Type hints describe intent but do not validate values at runtime.",
      "Comments that restate the code can drift; explain why or a non-obvious constraint.",
      "A refactor should preserve behavior and be covered by tests.",
    ],
  },
  "21": {
    overview:
      "Dates and times represent different concepts: calendar dates, wall-clock times, instants, and durations. Choose the correct type, parse formats deliberately, and make timezone assumptions explicit.",
    objectives: [
      "Use date, time, datetime, and timedelta for distinct purposes.",
      "Parse and format values with explicit format strings.",
      "Compare aware datetimes in a consistent timezone.",
      "Handle daylight-saving and naive-time ambiguity in real applications.",
    ],
    mistakes: [
      "A naive datetime does not identify a timezone or an unambiguous instant.",
      "Formatting tokens are case-sensitive; month and minute use different directives.",
      "Adding a fixed number of seconds is not always equivalent to adding a calendar day across timezone changes.",
    ],
  },
  "22": {
    overview:
      "HTTP APIs expose contracts over requests and responses. A client must construct a request, check status, parse the expected data shape, and handle timeouts and network errors without assuming success.",
    objectives: [
      "Understand methods, URLs, headers, status codes, and response bodies.",
      "Send a request with an appropriate timeout.",
      "Check HTTP errors and parse JSON only when the response supports it.",
      "Validate remote fields and avoid exposing credentials.",
    ],
    mistakes: [
      "A successful network connection does not mean the HTTP status is successful.",
      "Do not assume a response body is valid JSON or has the expected keys.",
      "A request without a timeout may wait indefinitely.",
    ],
  },
  "23": {
    overview:
      "The task-manager capstone combines input, decisions, loops, functions, collections, and persistence. Design the data operations first, then connect a small menu to those operations and test empty and malformed data.",
    objectives: [
      "Represent tasks with stable fields and clear completed-state behavior.",
      "Separate menu/input code from task operations.",
      "Load and save data safely with a documented format.",
      "Handle empty lists, invalid choices, and missing storage.",
    ],
    mistakes: [
      "Using list positions as permanent task IDs becomes unreliable after deletion or sorting.",
      "Saving after every unrelated statement increases coupling; centralize persistence.",
      "Never trust loaded data simply because it came from your own earlier version.",
    ],
  },
  "24": {
    overview:
      "The data-report capstone brings together data modeling, cleaning, calculation, presentation, testing, and communication. A strong result states assumptions and makes it possible to trace each reported number to its source.",
    objectives: [
      "Turn a question into fields and a clear input dataset.",
      "Validate and clean values before calculating.",
      "Separate transformation and calculation from report formatting.",
      "Test edge cases and communicate limitations and next steps.",
    ],
    mistakes: [
      "A report can be mathematically correct but misleading if units or assumptions are omitted.",
      "Do not mutate source records unexpectedly while computing derived values.",
      "Check empty data and missing fields before calculating averages or totals.",
    ],
  },
  "25": {
    overview:
      "Slicing selects a half-open range from an ordered sequence with sequence[start:stop:step]: start is included, stop is excluded, and step controls direction and spacing. Trace indexes explicitly, use negative bounds and reverse steps, and distinguish safe out-of-range slices from errors caused by indexing. Slices work on strings, lists, and tuples, with important differences between shallow copying and mutation.",
    objectives: [
      "Read [start:stop:step] and calculate included positions.",
      "Use omitted and negative bounds, positive steps, and reverse steps.",
      "Copy, rotate, split, and replace portions of lists.",
      "Trace slice positions by listing indexes and stopping before the exclusive bound.",
      "Use slice assignment and deletion while respecting extended-slice length rules.",
      "Handle empty, short, and nested sequences without off-by-one errors.",
    ],
    mistakes: [
      "The stop index is not included; [1:4] selects positions 1, 2, and 3.",
      "A slice creates a shallow outer copy; nested mutable items are still shared.",
      "A negative step changes traversal direction; bounds must be ordered for that direction.",
      "Slicing past an edge is safe, but indexing past an edge raises IndexError.",
      "Extended slice assignment such as items[::2] needs exactly one replacement per selected index.",
    ],
  },
  "26": {
    overview:
      "enumerate, zip, and unpacking make loops safer when positions and related records matter. Their behavior is lazy and length-sensitive, so decide explicitly how to handle mismatched inputs.",
    objectives: [
      "Use enumerate instead of manually maintaining an index.",
      "Combine parallel iterables with zip and strict length checking.",
      "Unpack tuples and records into meaningful names.",
      "Use starred unpacking only when collecting a variable-length middle portion.",
    ],
    mistakes: [
      "zip normally stops at the shortest input and can silently omit unmatched values.",
      "Unpacking target count must match unless one starred target absorbs remaining values.",
      "enumerate returns zero-based indices unless a start value is supplied.",
    ],
  },
  "27": {
    overview:
      "Sorting orders data; searching locates it. Correctness depends on choosing copy versus in-place mutation, supplying a meaningful sort key, and respecting the preconditions of algorithms such as binary search.",
    objectives: [
      "Choose sorted() for a new list and list.sort() for in-place ordering.",
      "Use key functions and tie-breakers for records.",
      "Compare linear search with binary search and their complexity.",
      "Maintain the sorted-input invariant required by binary search.",
    ],
    mistakes: [
      "list.sort() returns None; assigning its result loses the original list reference.",
      "Binary search is not correct on arbitrary unsorted input.",
      "A search result of index 0 is falsey; compare explicitly with -1 or None.",
    ],
  },
  "28": {
    overview:
      "Algorithm analysis describes how work and memory grow as input grows. Use Big O as a growth-rate model, inspect nested loops and repeated operations, and choose data structures based on the operations you need.",
    objectives: [
      "Identify constant, logarithmic, linear, and quadratic growth patterns.",
      "Count nested-loop iterations and independent input dimensions.",
      "Account for repeated membership, slicing, and copying costs.",
      "Compare time complexity with space and choose a practical tradeoff.",
    ],
    mistakes: [
      "Two sequential linear loops are O(n), not O(n squared); nested loops can multiply work.",
      "Big O ignores constants and lower-order terms; it is not an exact runtime prediction.",
      "A loop's number of iterations may depend on more than one input size.",
    ],
  },
  "29": {
    overview:
      "An iterable can produce values; an iterator tracks progress through them. Generators provide values lazily, which can reduce memory use but changes when computation happens and how often a value can be consumed.",
    objectives: [
      "Distinguish iterable objects from their iterators.",
      "Use iter() and next() and understand StopIteration.",
      "Write generator functions with yield and generator expressions.",
      "Choose lazy iteration when streaming is useful and reuse a sequence when repeated traversal is needed.",
    ],
    mistakes: [
      "A generator is usually exhausted after one complete traversal.",
      "yield pauses a generator; return ends it.",
      "Lazy values are computed as requested, so errors may occur during iteration rather than creation.",
    ],
  },
  "30": {
    overview:
      "Functional tools transform and select data without writing every loop by hand. Compare lambda, map, and filter with comprehensions, and favor readable expressions over compact but opaque pipelines.",
    objectives: [
      "Write lambda expressions for small single-expression functions.",
      "Apply map to transform and filter to select values.",
      "Recognize that map and filter return lazy iterators in Python 3.",
      "Choose a comprehension or loop when it reads more clearly.",
    ],
    mistakes: [
      "map and filter do not return lists automatically; materialize them when needed.",
      "A lambda can contain only one expression, not a sequence of statements.",
      "Creating side effects inside transformations makes pipelines harder to reason about.",
    ],
  },
  "31": {
    overview:
      "Regular expressions describe text patterns for searching, validating, extracting, and replacing. Learn the difference between search, match, and fullmatch, and use raw strings and groups to make patterns safer to read.",
    objectives: [
      "Use character classes, quantifiers, anchors, and escapes.",
      "Distinguish search(), match(), and fullmatch().",
      "Capture groups and named groups to extract structured text.",
      "Use substitutions and flags while avoiding overly permissive validation.",
    ],
    mistakes: [
      "A dot is a regex wildcard; escape it to match a literal period.",
      "search() can find a substring; use fullmatch() when the whole value must conform.",
      "Regex validation is not a substitute for parsing complex formats such as full email or URL standards.",
    ],
  },
  "32": {
    overview:
      "CSV is a record format with quoting and escaping rules, not simply values separated by commas. Use the csv module, preserve headers, convert field types explicitly, and write files with newline handling.",
    objectives: [
      "Read rows with reader or named fields with DictReader.",
      "Use newline='' and an explicit text encoding for files.",
      "Write headers and records using csv.writer or DictWriter.",
      "Validate and convert values while handling missing or malformed rows.",
    ],
    mistakes: [
      "Splitting a line on commas fails when a quoted field contains a comma.",
      "CSV fields are text; convert numeric values before arithmetic.",
      "Forgetting newline='' can cause extra blank lines on some platforms.",
    ],
  },
  "33": {
    overview:
      "SQLite stores relational data in tables and lets Python execute SQL locally. Use parameterized values, explicit transaction boundaries, sensible schema constraints, and predictable connection cleanup.",
    objectives: [
      "Create tables and query or modify rows with SQL.",
      "Use placeholders for every data value.",
      "Fetch rows and understand cursor results.",
      "Commit or roll back transactions and close connections.",
    ],
    mistakes: [
      "Never concatenate user-provided values into SQL strings.",
      "A SELECT returns a cursor; fetchone/fetchall reads its rows.",
      "A transaction context commits or rolls back, but does not necessarily close the connection.",
    ],
  },
  "34": {
    overview:
      "A command-line interface is a user-facing contract. Separate argument parsing from application logic, validate paths and options, produce useful help and errors, and return meaningful exit status.",
    objectives: [
      "Define positional and optional arguments with argparse.",
      "Use types, defaults, choices, and required flags appropriately.",
      "Separate a testable main(args) function from terminal input/output.",
      "Handle files and error status without surprising users.",
    ],
    mistakes: [
      "Argument values are strings unless converted by type or parsed explicitly.",
      "Calling parse_args() directly in business logic makes tests and reuse harder.",
      "Do not overwrite user files without clear documentation and deliberate behavior.",
    ],
  },
  "35": {
    overview:
      "A virtual environment isolates a project's installed packages from other projects. Reproducible setup also records dependencies, uses the intended interpreter, and excludes generated environment files from version control.",
    objectives: [
      "Create and activate a venv for the current project.",
      "Use python -m pip to install through the selected interpreter.",
      "Record and recreate dependencies from a requirements file.",
      "Ignore environment directories and verify the active interpreter.",
    ],
    mistakes: [
      "Installing with a different pip than the project's Python creates confusing environments.",
      "A requirements file is a declaration, not the environment itself.",
      "Do not commit .venv; recreate it from documented dependencies.",
    ],
  },
  "36": {
    overview:
      "Context managers make setup and cleanup reliable; decorators add reusable behavior around callables. Both are abstraction tools: preserve exceptions and results, and use them when they improve clarity.",
    objectives: [
      "Use with blocks for files, locks, and other managed resources.",
      "Understand __enter__/__exit__ behavior at a high level.",
      "Write decorators that forward arguments and return values.",
      "Use functools.wraps to preserve useful function metadata.",
    ],
    mistakes: [
      "A decorator wrapper that forgets return changes the wrapped function's result to None.",
      "A context manager's cleanup runs when the block exits, including through exceptions.",
      "Use wraps so documentation and introspection do not misleadingly describe the wrapper.",
    ],
  },
  "37": {
    overview:
      "Type hints describe intended interfaces for readers and static analysis; they do not enforce input at runtime. Dataclasses provide concise record models, while validation remains an explicit responsibility.",
    objectives: [
      "Annotate parameters, return values, and collection element types.",
      "Use dataclasses for record-like values and default_factory for mutable fields.",
      "Validate domain rules in constructors or boundary functions.",
      "Keep serialization and runtime validation separate from type annotations.",
    ],
    mistakes: [
      "A type annotation does not prevent an invalid value from being passed at runtime.",
      "Using [] as a shared dataclass default is invalid or unsafe; use default_factory.",
      "bool is a subclass of int, which can matter for strict integer validation.",
    ],
  },
  "38": {
    overview:
      "Practical API clients must handle transport, HTTP status, content type, JSON decoding, and schema validation as separate steps. Add timeouts and avoid assuming remote services are reliable or trustworthy.",
    objectives: [
      "Construct GET or POST requests with appropriate parameters and headers.",
      "Set timeouts and handle connection and timeout failures.",
      "Check HTTP status before interpreting the response body.",
      "Validate response types and fields before using remote data.",
    ],
    mistakes: [
      "Calling .json() does not prove the response is valid or has the expected schema.",
      "A timeout is not the same as an HTTP error status.",
      "Do not retry non-idempotent operations blindly; a request may already have succeeded.",
    ],
  },
  "39": {
    overview:
      "Security is part of ordinary program design: treat external input as untrusted, use APIs that separate data from instructions, minimize secret exposure, and fail safely without leaking sensitive details.",
    objectives: [
      "Validate data at trust boundaries and enforce authorization separately.",
      "Use parameterized SQL and safe process APIs rather than string-built commands.",
      "Protect credentials, personal data, and error details.",
      "Apply least privilege and avoid treating input filtering as the only defense.",
    ],
    mistakes: [
      "Escaping strings by hand is not a substitute for parameterized APIs.",
      "Validation does not replace authorization: valid input may still be unauthorized.",
      "Never hard-code secrets or return stack traces and sensitive values to users.",
    ],
  },
};
