export interface SemesterLecture {
  id: string; // unique code, e.g., "sem-dbms-u1-l1"
  title: string;
  youtubeId: string;
  duration: string;
  description: string;
}

export interface SemesterUnit {
  unitNumber: number;
  title: string;
  lectures: SemesterLecture[];
}

export interface SemesterSubject {
  id: string; // lowercased code, e.g., "dsa", "dbms", "coa", "oop", "os"
  title: string;
  code: string;
  description: string;
  icon: string;
  gradient: string;
  units: SemesterUnit[];
  semester: number;
}

export const semesterSubjects: SemesterSubject[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    code: "KCS-301",
    description: "Learn fundamental linear and non-linear data structures including Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, and Dynamic Programming.",
    icon: "⚡",
    gradient: "from-indigo-500 to-purple-600",
    semester: 3,
    units: [
      {
        unitNumber: 1,
        title: "Unit 1: Introduction to Data Structures & Arrays",
        lectures: [
          {
            id: "sem-dsa-u1-l1",
            title: "Introduction to Data Structures & Algorithmic Analysis",
            youtubeId: "zWg7U0O7y5g",
            duration: "45 mins",
            description: "An overview of data structures, their classifications (linear vs non-linear), and standard complexity notations."
          },
          {
            id: "sem-dsa-u1-l2",
            title: "Time & Space Complexity (Big-O, Omega, Theta)",
            youtubeId: "A03oI0znAoc",
            duration: "52 mins",
            description: "Deep dive into analyzing algorithms using asymptotic runtime complexities and spatial demands."
          },
          {
            id: "sem-dsa-u1-l3",
            title: "Array Data Structure & Memory Mapping",
            youtubeId: "4GjZ7X0f1lM",
            duration: "38 mins",
            description: "Learn how array elements are mapped in single and multidimensional memory layouts, including Row Major Order."
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Unit 2: Stacks & Queues",
        lectures: [
          {
            id: "sem-dsa-u2-l1",
            title: "Stack Data Structure & Array Implementation",
            youtubeId: "I37kBOIYIlU",
            duration: "40 mins",
            description: "Understand the LIFO principle, basic stack operations (Push, Pop, Peek), and overflow/underflow handling."
          },
          {
            id: "sem-dsa-u2-l2",
            title: "Queue Data Structure & Circular Queue",
            youtubeId: "zp6p1HT96pU",
            duration: "48 mins",
            description: "Learn the FIFO concept, basic linear queue operations, and how circular queues optimize memory space."
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Unit 3: Linked Lists",
        lectures: [
          {
            id: "sem-dsa-u3-l1",
            title: "Singly Linked List: Insertion, Deletion & Search",
            youtubeId: "dmb1i4yhx5o",
            duration: "55 mins",
            description: "Step-by-step implementation of dynamic linked lists in memory, including node traversal algorithms."
          },
          {
            id: "sem-dsa-u3-l2",
            title: "Doubly Linked List & Circular Linked List",
            youtubeId: "868yJ0_hZ3o",
            duration: "50 mins",
            description: "Explore bidirectional pointers in Doubly Linked Lists and head-pointing structures in Circular Lists."
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Unit 4: Trees & Search Structures",
        lectures: [
          {
            id: "sem-dsa-u4-l1",
            title: "Binary Tree Basics & Traversals (Inorder, Preorder, Postorder)",
            youtubeId: "8270xS0wYy8",
            duration: "58 mins",
            description: "Understand hierarchical tree structures, binary trees, and basic recursion-based tree traversal techniques."
          },
          {
            id: "sem-dsa-u4-l2",
            title: "Binary Search Tree (BST) Operations",
            youtubeId: "sf_9SS7-5yE",
            duration: "46 mins",
            description: "Study the search property of BSTs, inserting nodes, and deleting nodes containing single/dual children."
          },
          {
            id: "sem-dsa-u4-l3",
            title: "AVL Tree & Height Balancing Rotations",
            youtubeId: "jDM6_VxT2Rk",
            duration: "62 mins",
            description: "Introduction to self-balancing trees, balance factor, and LL, RR, LR, RL balancing rotations."
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Unit 5: Graphs & Sorting Algorithms",
        lectures: [
          {
            id: "sem-dsa-u5-l1",
            title: "Graph Representations & Breadth-First Search (BFS)",
            youtubeId: "pcKY4hjDrxk",
            duration: "50 mins",
            description: "Explore adjacency matrices/lists and queue-based BFS graph traversal logic."
          },
          {
            id: "sem-dsa-u5-l2",
            title: "Graph Traversal: Depth-First Search (DFS)",
            youtubeId: "iaBEKo5sM70",
            duration: "45 mins",
            description: "Study recursion-based stack structures for deep path traversal in undirected and directed graphs."
          },
          {
            id: "sem-dsa-u5-l3",
            title: "Dijkstra's Single Source Shortest Path Algorithm",
            youtubeId: "XB4MIexjvY0",
            duration: "55 mins",
            description: "Understand greedy path minimization for finding shortest paths in weighted graphs using distance arrays."
          }
        ]
      }
    ]
  },
  {
    id: "dbms",
    title: "Database Management System",
    code: "KCS-302",
    description: "Understand structural models, relational database schemas, structured query language, normal forms, and concurrent transaction operations.",
    icon: "🗄️",
    gradient: "from-blue-500 to-teal-600",
    semester: 3,
    units: [
      {
        unitNumber: 1,
        title: "Unit 1: Database Architecture & ER Model",
        lectures: [
          {
            id: "sem-dbms-u1-l1",
            title: "Introduction to DBMS & Three-Schema Architecture",
            youtubeId: "3EJlove1pqA",
            duration: "42 mins",
            description: "Understand database abstraction layers, logical vs physical data independence, and basic definitions."
          },
          {
            id: "sem-dbms-u1-l2",
            title: "Entity-Relationship (E-R) Diagram & Attributes",
            youtubeId: "f8C24424m5s",
            duration: "50 mins",
            description: "Learn how to map business constraints into entities, attributes, relationships, cardinalities, and keys."
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Unit 2: Relational Model & Relational Algebra",
        lectures: [
          {
            id: "sem-dbms-u2-l1",
            title: "Relational Model Concepts & Keys",
            youtubeId: "5eSdf3A2Wk4",
            duration: "48 mins",
            description: "Explore tables, attributes, schemas, domains, primary keys, super keys, candidate keys, and foreign keys."
          },
          {
            id: "sem-dbms-u2-l2",
            title: "Relational Algebra Operations: Select, Project, Join",
            youtubeId: "u063cWf2T48",
            duration: "56 mins",
            description: "Learn functional query algebra operations, set operations, Cartesian product, and Theta/Natural joins."
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Unit 3: SQL & Relational Normalization",
        lectures: [
          {
            id: "sem-dbms-u3-l1",
            title: "SQL Query Basics: DDL, DML & Subqueries",
            youtubeId: "fZ-zZ260-k0",
            duration: "54 mins",
            description: "Hands-on structuring of SQL statements, filtering with WHERE/HAVING, groupings, and nested queries."
          },
          {
            id: "sem-dbms-u3-l2",
            title: "Relational Normalization (1NF, 2NF, 3NF, BCNF)",
            youtubeId: "z8F-gA7lW9E",
            duration: "65 mins",
            description: "Study database anomalies, functional dependencies, and multi-step normalization rules to remove redundancy."
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Unit 4: Transaction & Concurrency Control",
        lectures: [
          {
            id: "sem-dbms-u4-l1",
            title: "Transactions & ACID Properties Explained",
            youtubeId: "t7Pr_Qpqn0I",
            duration: "38 mins",
            description: "Explore the core aspects of transaction states, Commit/Rollback, and Atomicity, Consistency, Isolation, and Durability."
          },
          {
            id: "sem-dbms-u4-l2",
            title: "Concurrency Control: Two-Phase Locking (2PL)",
            youtubeId: "9lV1W0kR9l8",
            duration: "46 mins",
            description: "Learn how shared/exclusive locks and strict 2PL maintain serializability without deadlock hazards."
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Unit 5: File Indexing",
        lectures: [
          {
            id: "sem-dbms-u5-l1",
            title: "File Organization & Tree Indexing (B-Trees / B+ Trees)",
            youtubeId: "qI3-9W7i4Z4",
            duration: "52 mins",
            description: "Study physical index structures, primary/secondary indexes, and dynamic node branching in B+ Trees."
          }
        ]
      }
    ]
  },
  {
    id: "coa",
    title: "Computer Organization & Architecture",
    code: "KCS-303",
    description: "Explore central CPU architectures, register transfers, computer math, instruction pipelining, and memory hierarchy setups.",
    icon: "💻",
    gradient: "from-pink-500 to-rose-600",
    semester: 3,
    units: [
      {
        unitNumber: 1,
        title: "Unit 1: Introduction & Register Transfer Language",
        lectures: [
          {
            id: "sem-coa-u1-l1",
            title: "Functional Units of a Digital Computer",
            youtubeId: "4f2w5y5S01w",
            duration: "44 mins",
            description: "Examine execution structures, ALU, control unit, system registers, and internal bus structures."
          },
          {
            id: "sem-coa-u1-l2",
            title: "Register Transfer & Bus Organization",
            youtubeId: "zK4qU5z8wQ4",
            duration: "48 mins",
            description: "Understand micro-operations, tri-state buffers, multiplexer-based bus structures, and memory transfer cycles."
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Unit 2: Computer Arithmetic",
        lectures: [
          {
            id: "sem-coa-u2-l1",
            title: "Booth's Multiplication Algorithm for Signed Integers",
            youtubeId: "z9F5Xn-4Ww0",
            duration: "52 mins",
            description: "Step-by-step arithmetic cycles using 2's complement and shift sequences to multiply signed integers."
          },
          {
            id: "sem-coa-u2-l2",
            title: "Floating Point Arithmetic & IEEE-754 Standard",
            youtubeId: "w3_YhG8W6yE",
            duration: "46 mins",
            description: "Explore mantissa/exponent encoding formats, normalized representations, and floating point add/sub structures."
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Unit 3: Control Unit & Pipeline Architecture",
        lectures: [
          {
            id: "sem-coa-u3-l1",
            title: "Hardwired vs Microprogrammed Control Units",
            youtubeId: "mE9I3-4QyQ8",
            duration: "40 mins",
            description: "Compare state decoder grids with microinstruction ROM microprogram sequences."
          },
          {
            id: "sem-coa-u3-l2",
            title: "Instruction Pipelining & Hazard Resolution",
            youtubeId: "3R3w_G9A4J4",
            duration: "50 mins",
            description: "Learn overlaps in fetch/decode/execute phases, data/control hazards, and branch prediction mechanisms."
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Unit 4: Memory System",
        lectures: [
          {
            id: "sem-coa-u4-l1",
            title: "Cache Memory Mapping (Direct, Associative, Set-Associative)",
            youtubeId: "X9R0Z0wz9w0",
            duration: "56 mins",
            description: "Learn how CPU cache blocks are index-mapped, tag comparisons, and cache hit metrics."
          },
          {
            id: "sem-coa-u4-l2",
            title: "Virtual Memory & Paging Schemes",
            youtubeId: "eI_VwGvX2E4",
            duration: "45 mins",
            description: "Understand translation of virtual addresses into physical addresses using page tables and TLBs."
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Unit 5: Input/Output & DMA",
        lectures: [
          {
            id: "sem-coa-u5-l1",
            title: "Direct Memory Access (DMA) Transfer Mechanics",
            youtubeId: "9z_H9O0W3y4",
            duration: "42 mins",
            description: "Examine high-speed device memory interactions without CPU utilization using Bus Grant/Request protocols."
          }
        ]
      }
    ]
  },
  {
    id: "oop",
    title: "Object Oriented Programming",
    code: "KCS-304",
    description: "Master OOP principles (Abstraction, Encapsulation, Inheritance, Polymorphism) using Java/C++ with standard library interfaces.",
    icon: "☕",
    gradient: "from-amber-500 to-orange-600",
    semester: 4,
    units: [
      {
        unitNumber: 1,
        title: "Unit 1: Introduction to OOP & Java Basics",
        lectures: [
          {
            id: "sem-oop-u1-l1",
            title: "OOP Paradigms vs Procedure-Oriented Programming",
            youtubeId: "wsJCFDhBy1M",
            duration: "38 mins",
            description: "Learn procedural flaws, object orientation, security enhancements, and class instances."
          },
          {
            id: "sem-oop-u1-l2",
            title: "Java Virtual Machine (JVM) Architecture & Execution",
            youtubeId: "n_5IuAS0PWI",
            duration: "45 mins",
            description: "Explore the compilation of source code to byte code, JIT, Garbage Collector, and memory execution areas."
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Unit 2: Inheritance & Polymorphism",
        lectures: [
          {
            id: "sem-oop-u2-l1",
            title: "Inheritance Types & super/this Keywords",
            youtubeId: "7dA6Q_MQUdc",
            duration: "52 mins",
            description: "Learn code reusability using single, multilevel, hierarchical inheritance, and parent constructor bindings."
          },
          {
            id: "sem-oop-u2-l2",
            title: "Polymorphism: Method Overloading & Overriding",
            youtubeId: "KR6s0uWRllw",
            duration: "48 mins",
            description: "Compare static (compile-time) bindings with dynamic method dispatch (runtime polymorphism)."
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Unit 3: Packages, Interfaces & Exception Handling",
        lectures: [
          {
            id: "sem-oop-u3-l1",
            title: "Exception Handling: Try, Catch, Finally & Throw",
            youtubeId: "8cAMhZ8ErsA",
            duration: "50 mins",
            description: "How to handle runtime errors gracefully, built-in exception types, and writing custom exceptions."
          },
          {
            id: "sem-oop-u3-l2",
            title: "Interfaces & Abstract Classes",
            youtubeId: "hF48nbTIvMM",
            duration: "46 mins",
            description: "Understand abstraction, defining abstract schemas, multiple inheritance workaround via Interfaces."
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Unit 4: Multithreading & Collections",
        lectures: [
          {
            id: "sem-oop-u4-l1",
            title: "Multithreading Basics & Java Thread Lifecycle",
            youtubeId: "Reaqf3_V108",
            duration: "55 mins",
            description: "Learn concurrent operations by extending Thread class or implementing Runnable interface, thread states, and locks."
          },
          {
            id: "sem-oop-u4-l2",
            title: "Java Collections Framework Introduction",
            youtubeId: "7a7G84jLQrc",
            duration: "51 mins",
            description: "Explore dynamic List, Set, Map structures, and standard iterator interfaces."
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Unit 5: Stream Classes & I/O",
        lectures: [
          {
            id: "sem-oop-u5-l1",
            title: "Java Input/Output Streams & File Operations",
            youtubeId: "MmATIPs1gEk",
            duration: "48 mins",
            description: "Read and write streams from disks using ByteStream (FileInputStream) and CharacterStream (FileReader)."
          }
        ]
      }
    ]
  },
  {
    id: "os",
    title: "Operating Systems",
    code: "KCS-305",
    description: "Learn multi-tasking scheduling, synchronization traps, deadlock prevention, physical/virtual memory paging, and storage layouts.",
    icon: "⚙️",
    gradient: "from-violet-500 to-indigo-600",
    semester: 4,
    units: [
      {
        unitNumber: 1,
        title: "Unit 1: Introduction & Structures",
        lectures: [
          {
            id: "sem-os-u1-l1",
            title: "Operating System Functions & System Calls",
            youtubeId: "v3_G4Ww0zQ4",
            duration: "40 mins",
            description: "Introduction to OS kernels, user/kernel space modes, and system call traps for file/process/device control."
          },
          {
            id: "sem-os-u1-l2",
            title: "System Architecture (Monolithic, Microkernel, Hybrid)",
            youtubeId: "w3_H9Ww0zQ4",
            duration: "42 mins",
            description: "Examine architectural differences, performance parameters, and modular structuring in OS kernels."
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Unit 2: Process Scheduling & CPU Algorithms",
        lectures: [
          {
            id: "sem-os-u2-l1",
            title: "Process State Diagram & PCB Representation",
            youtubeId: "x3_J9Ww0zQ4",
            duration: "48 mins",
            description: "Understand scheduler queues, Context Switching overhead, and Process Control Block contents."
          },
          {
            id: "sem-os-u2-l2",
            title: "CPU Scheduling Algorithms (FCFS, SJF, Round Robin)",
            youtubeId: "y3_K9Ww0zQ4",
            duration: "58 mins",
            description: "Calculate turnaround times, waiting times, and analyze throughput optimization."
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Unit 3: Process Synchronization & Deadlocks",
        lectures: [
          {
            id: "sem-os-u3-l1",
            title: "Process Synchronization: Semaphores & Critical Section",
            youtubeId: "z3_L9Ww0zQ4",
            duration: "54 mins",
            description: "Understand race conditions, critical section constraints, and using wait/signal semaphores."
          },
          {
            id: "sem-os-u3-l2",
            title: "Deadlock Avoidance & Banker's Algorithm",
            youtubeId: "a3_M9Ww0zQ4",
            duration: "50 mins",
            description: "Understand deadlock conditions, safe states, resource allocation matrices, and Banker's safety loop."
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Unit 4: Memory Management",
        lectures: [
          {
            id: "sem-os-u4-l1",
            title: "Paging, Segmentation & TLB Memory Tables",
            youtubeId: "b3_N9Ww0zQ4",
            duration: "54 mins",
            description: "Examine logical address space mappings, internal fragmentation mitigation, and TLB lookups."
          },
          {
            id: "sem-os-u4-l2",
            title: "Demand Paging & Page Replacement Algorithms",
            youtubeId: "c3_O9Ww0zQ4",
            duration: "50 mins",
            description: "Compare FIFO, LRU, and Optimal replacement strategies during page faults."
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Unit 5: File & Disk Systems",
        lectures: [
          {
            id: "sem-os-u5-l1",
            title: "File Allocation Methods (Contiguous, Linked, Indexed)",
            youtubeId: "d3_P9Ww0zQ4",
            duration: "44 mins",
            description: "Compare disk file indexing strategies, sequential files, and inodes."
          },
          {
            id: "sem-os-u5-l2",
            title: "Disk Scheduling Algorithms (FCFS, SSTF, SCAN, LOOK)",
            youtubeId: "e3_Q9Ww0zQ4",
            duration: "48 mins",
            description: "Analyze read/write head movement optimizations and seek latency controls."
          }
        ]
      }
    ]
  }
  ,
{
  id: "uhvpe",
  title: "Universal Human Values & Professional Ethics",
  code: "KVE-301",
  description: "Study human values, ethics, professionalism, social responsibility and sustainable development.",
  icon: "🌱",
  gradient: "from-green-500 to-emerald-600",
  semester: 3,
  units: [
    {
      unitNumber: 1,
      title: "Unit 1: Need, Basic Guidelines and Process for Value Education",
      lectures: [
        {
          id: "sem-uhv-u1-l1",
          title: "Introduction to Value Education & Self Exploration",
          youtubeId: "zWg7U0O7y5g",
          duration: "35 mins",
          description: "Understanding the need, basic guidelines, content and process for Value Education."
        },
        {
          id: "sem-uhv-u1-l2",
          title: "Continuous Happiness and Prosperity",
          youtubeId: "A03oI0znAoc",
          duration: "40 mins",
          description: "Exploring basic human aspirations and their fulfillment through right understanding and relationships."
        }
      ]
    },
    {
      unitNumber: 2,
      title: "Unit 2: Understanding Harmony in the Human Being",
      lectures: [
        {
          id: "sem-uhv-u2-l1",
          title: "Harmony in the Self - Understanding Myself",
          youtubeId: "4GjZ7X0f1lM",
          duration: "45 mins",
          description: "Understanding the human being as a co-existence of the sentient 'I' and the material 'Body'."
        }
      ]
    }
  ]
},
{
  id: "tc",
  title: "Technical Communication",
  code: "KAS-302",
  description: "Improve technical writing, presentations, professional communication and interview skills.",
  icon: "🗣️",
  gradient: "from-cyan-500 to-blue-600",
  semester: 3,
  units: [
    {
      unitNumber: 1,
      title: "Unit 1: Introduction to Technical Communication",
      lectures: [
        {
          id: "sem-tc-u1-l1",
          title: "Fundamentals of Technical Communication",
          youtubeId: "pcKY4hjDrxk",
          duration: "30 mins",
          description: "Definition, features, and differences between technical communication and general communication."
        },
        {
          id: "sem-tc-u1-l2",
          title: "Barriers to Communication & Solutions",
          youtubeId: "iaBEKo5sM70",
          duration: "35 mins",
          description: "Identify key psychological, physical, and linguistic barriers and how to overcome them."
        }
      ]
    }
  ]
},
{
  id: "maths",
  title: "Engineering Mathematics",
  code: "KAS-303",
  description: "Cover matrices, differential equations, Laplace transforms and numerical methods.",
  icon: "📘",
  gradient: "from-purple-500 to-pink-600",
  semester: 3,
  units: [
    {
      unitNumber: 1,
      title: "Unit 1: Linear Algebra & Matrix Calculus",
      lectures: [
        {
          id: "sem-math-u1-l1",
          title: "Inverse of Matrix & Elementary Transformations",
          youtubeId: "XB4MIexjvY0",
          duration: "50 mins",
          description: "Examine matrix rank, normal form, and solving linear simultaneous equations using Gaussian elimination."
        },
        {
          id: "sem-math-u1-l2",
          title: "Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem",
          youtubeId: "pcKY4hjDrxk",
          duration: "55 mins",
          description: "Compute characteristic roots and vectors, and apply the Cayley-Hamilton theorem to find matrix powers."
        }
      ]
    }
  ]
},
{
  id: "python",
  title: "Python Programming",
  code: "KCS-401",
  description: "Learn Python fundamentals, OOP concepts, file handling, modules and libraries.",
  icon: "🐍",
  gradient: "from-yellow-500 to-orange-600",
  semester: 4,
  units: [
    {
      unitNumber: 1,
      title: "Unit 1: Introduction & Python Programming Basics",
      lectures: [
        {
          id: "sem-py-u1-l1",
          title: "Python Setup, Syntax & Variables",
          youtubeId: "6WOkDnYr-Ow",
          duration: "42 mins",
          description: "Set up the development environment, execute scripts, and understand basic data types and operations."
        },
        {
          id: "sem-py-u1-l2",
          title: "Conditional Statements & Loops in Python",
          youtubeId: "gc5p4SW71P8",
          duration: "48 mins",
          description: "Construct logical flows using if-else structures, while loops, and for loop iterations."
        }
      ]
    }
  ]
},
{
  id: "toa",
  title: "Theory of Automata",
  code: "KCS-402",
  description: "Study finite automata, regular expressions, context free grammar and Turing machines.",
  icon: "🔄",
  gradient: "from-red-500 to-rose-600",
  semester: 4,
  units: [
    {
      unitNumber: 1,
      title: "Unit 1: Finite Automata & Formal Languages",
      lectures: [
        {
          id: "sem-toa-u1-l1",
          title: "Introduction to Theory of Automata",
          youtubeId: "sf_9SS7-5yE",
          duration: "45 mins",
          description: "Understand alphabet definitions, strings, languages, and basics of state transition systems."
        },
        {
          id: "sem-toa-u1-l2",
          title: "DFA (Deterministic Finite Automata) Construction",
          youtubeId: "jDM6_VxT2Rk",
          duration: "52 mins",
          description: "Construct DFAs for processing various regular string conditions and state minimization."
        }
      ]
    }
  ]
}
];
