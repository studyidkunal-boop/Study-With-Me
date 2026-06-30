export interface Lecture {
  id: string;
  title: string;
  duration: string;
  youtubeId?: string; // Placeholder or default video ID
  description?: string;
}

export interface Resource {
  title: string;
  type: "PDF" | "Notes" | "Cheat Sheet" | "Link";
  url: string;
  size?: string;
}

export interface PracticeProblem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  platform: "LeetCode" | "GeeksforGeeks";
  url: string;
}

export interface DSAModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  concepts: string[];
  lectures: Lecture[];
  resources: Resource[];
  practiceProblems: PracticeProblem[];
}

export const dsaModules: DSAModule[] = [
  {
    id: "basics-complexity",
    title: "1. Basics & Time Complexity",
    description: "Build a strong foundation in programming concepts, syntax, and analyzing code efficiency using asymptotic notations.",
    estimatedTime: "8 Hours",
    concepts: ["Flowcharts", "Variables & Types", "Time Complexity", "Space Complexity"],
    lectures: [
      {
        id: "lec-basics-1",
        title: "Flowchart & Pseudocode Introduction",
        duration: "45 mins",
        youtubeId: "qnDhYSj4uv0",
        description: "Understand the visual representation of logic and write pseudocode for basic algorithms."
      },
      {
        id: "lec-basics-2",
        title: "Variables, Datatypes & Operators",
        duration: "55 mins",
        youtubeId: "6WOkDnYr-Ow",
        description: "Explore primitive datatypes, memory layout, and arithmetic/logical operators."
      },
      {
        id: "lec-basics-3",
        title: "Asymptotic Notation: Big-O, Theta, Omega",
        duration: "1h 10m",
        youtubeId: "VAu-w8lCoF8",
        description: "Learn how to mathematically bound the execution time and memory of an algorithm."
      }
    ],
    resources: [
      {
        title: "Basics of Programming Cheatsheet",
        type: "Cheat Sheet",
        url: "#",
        size: "1.2 MB"
      },
      {
        title: "Time & Space Complexity Handout",
        type: "Notes",
        url: "#",
        size: "850 KB"
      }
    ],
    practiceProblems: [
      {
        title: "Steps to Reduce a Number to Zero",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/"
      },
      {
        title: "Power of Two",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/power-of-two/"
      }
    ]
  },
  {
    id: "arrays-vectors",
    title: "2. Arrays & Multi-Dimensional Matrices",
    description: "Master one of the most fundamental linear data structures. Learn element access, modification, rotations, and multi-dimensional matrices.",
    estimatedTime: "15 Hours",
    concepts: ["Dynamic Arrays", "Two Pointers", "Sliding Window", "Matrix Rotation"],
    lectures: [
      {
        id: "lec-arrays-1",
        title: "Introduction to Arrays & Memory Allocation",
        duration: "50 mins",
        youtubeId: "mY1o1bZyfzE",
        description: "How arrays are stored in memory and basic operations like insertion and deletion."
      },
      {
        id: "lec-arrays-2",
        title: "Prefix Sum & Kadane's Algorithm",
        duration: "1h 15m",
        youtubeId: "1EK1D1b9mB8",
        description: "Solve maximum contiguous subarray sum in linear time."
      },
      {
        id: "lec-arrays-3",
        title: "2D Arrays: Spiral Print & Rotation",
        duration: "1h 05m",
        youtubeId: "iTr-6bF2y0Y",
        description: "Traverse matrices in spiral order and rotate a matrix by 90 degrees."
      }
    ],
    resources: [
      {
        title: "Array Interview Cheat Sheet",
        type: "Cheat Sheet",
        url: "#",
        size: "2.1 MB"
      },
      {
        title: "2D Grid Algorithms PDF Guide",
        type: "PDF",
        url: "#",
        size: "1.5 MB"
      }
    ],
    practiceProblems: [
      {
        title: "Two Sum",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/two-sum/"
      },
      {
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/maximum-subarray/"
      },
      {
        title: "Rotate Image (Matrix)",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/rotate-image/"
      }
    ]
  },
  {
    id: "searching-sorting",
    title: "3. Searching & Sorting Algorithms",
    description: "Deep dive into sorting numbers and searching efficiently using binary search, including advanced binary search on answers.",
    estimatedTime: "18 Hours",
    concepts: ["Binary Search", "Sorting", "Dividing & Conquer", "Binary Search on Answers"],
    lectures: [
      {
        id: "lec-search-1",
        title: "Binary Search Basics & Implementations",
        duration: "58 mins",
        youtubeId: "LfeH5aFeP7E",
        description: "Master the iterative and recursive binary search templates."
      },
      {
        id: "lec-search-2",
        title: "Book Allocation & Painters Partition",
        duration: "1h 30m",
        youtubeId: "_7bkkij2cQg",
        description: "Learn the binary search on answers pattern to solve hard optimization problems."
      },
      {
        id: "lec-sort-1",
        title: "Sorting Algorithms (Merge, Quick Sort)",
        duration: "1h 10m",
        youtubeId: "K1au0inlPdI",
        description: "Understand stability, in-place sorting, and optimal divide and conquer sorting techniques."
      }
    ],
    resources: [
      {
        title: "Sorting Cheat Sheet",
        type: "Cheat Sheet",
        url: "#",
        size: "1.1 MB"
      },
      {
        title: "Binary Search Templates Notes",
        type: "Notes",
        url: "#",
        size: "600 KB"
      }
    ],
    practiceProblems: [
      {
        title: "Binary Search",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/binary-search/"
      },
      {
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      },
      {
        title: "Capacity To Ship Packages Within D Days",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
      }
    ]
  },
  {
    id: "strings-hashing",
    title: "4. Strings & Hashing",
    description: "Learn string manipulation, memory storage in Java/C++, custom pattern matching, and efficient lookup using HashMaps.",
    estimatedTime: "10 Hours",
    concepts: ["String Immutability", "Sliding Window", "Hashing", "Anagrams"],
    lectures: [
      {
        id: "lec-string-1",
        title: "Strings in Java: Heap vs Constant Pool",
        duration: "45 mins",
        youtubeId: "_hvBbiMRoo0",
        description: "Understand how strings are handled internally and how to optimize string builder calls."
      },
      {
        id: "lec-string-2",
        title: "Reverse Words & Palindromes",
        duration: "52 mins",
        youtubeId: "HdXJAEVmTcU",
        description: "Solve key interview problems on string manipulation and reversing."
      }
    ],
    resources: [
      {
        title: "String Patterns Cheatsheet",
        type: "Cheat Sheet",
        url: "#",
        size: "950 KB"
      }
    ],
    practiceProblems: [
      {
        title: "Valid Anagram",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/valid-anagram/"
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      }
    ]
  },
  {
    id: "linked-lists",
    title: "5. Linked Lists",
    description: "Transition from contiguous memory storage to node-based dynamic memory. Study singly, doubly, and circular linked lists.",
    estimatedTime: "12 Hours",
    concepts: ["Pointers", "Cycle Detection", "Reversal", "Doubly Linked List"],
    lectures: [
      {
        id: "lec-ll-1",
        title: "Singly Linked List: Insertion & Deletion",
        duration: "1h 05m",
        youtubeId: "X2NVOSNBbxU",
        description: "Create nodes, link them, and handle edge cases of head and tail mutations."
      },
      {
        id: "lec-ll-2",
        title: "Reverse a Linked List & Cycle Detection",
        duration: "1h 20m",
        youtubeId: "X2NVOSNBbxU",
        description: "Iteratively and recursively reverse links. Find cycles using Floyd's Tortoise and Hare algorithm."
      }
    ],
    resources: [
      {
        title: "Linked List Interview Handbook",
        type: "PDF",
        url: "#",
        size: "1.8 MB"
      }
    ],
    practiceProblems: [
      {
        title: "Reverse Linked List",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/reverse-linked-list/"
      },
      {
        title: "Linked List Cycle",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/linked-list-cycle/"
      },
      {
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/"
      }
    ]
  },
  {
    id: "trees-graphs",
    title: "6. Trees & Graphs",
    description: "Explore hierarchical structures. Learn Binary Trees, Binary Search Trees, and graphs, focusing on traversal algorithms (BFS and DFS).",
    estimatedTime: "25 Hours",
    concepts: ["DFS & BFS", "Recursion", "BST Inorder Property", "Shortest Path"],
    lectures: [
      {
        id: "lec-trees-1",
        title: "Binary Tree Representation & Traversal",
        duration: "1h 15m",
        youtubeId: "X2NVOSNBbxU",
        description: "Understand preorder, inorder, postorder, and level-order traversals."
      },
      {
        id: "lec-graphs-1",
        title: "Graph Representation (Adjacency List/Matrix)",
        duration: "1h 10m",
        youtubeId: "X2NVOSNBbxU",
        description: "Learn how to store vertices and edges. Implement BFS and DFS traversal."
      }
    ],
    resources: [
      {
        title: "Tree Traversals Cheatsheet",
        type: "Cheat Sheet",
        url: "#",
        size: "1.4 MB"
      },
      {
        title: "Graph Algorithms Summary Notes",
        type: "Notes",
        url: "#",
        size: "2.3 MB"
      }
    ],
    practiceProblems: [
      {
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      {
        title: "Number of Islands",
        difficulty: "Medium",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/number-of-islands/"
      }
    ]
  }
];
