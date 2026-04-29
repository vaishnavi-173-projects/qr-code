export const rooms = {
  "asf014": {
    title: "ASF-014",
    puzzle: "A vault can only be opened by the decimal value of the XOR of these two binary numbers:\n\n01011011\n01010001\n\nXOR them bit by bit, then convert the result to decimal.",
    hint: "XOR rule: 0 XOR 0 = 0, 1 XOR 1 = 0, 0 XOR 1 = 1. Do it bit by bit then convert.",
    answer: "14",
    code: "ASF - 014"
  },
  "asf011": {
    title: "ASF-011",
    puzzle: "A spy intercepts two binary transmissions on the same frequency. The real message is hidden in their SUM:\n\nSignal A: 0110\nSignal B: 0101\n\nAdd them in binary, then convert the result to decimal.",
    hint: "Add like normal addition but in base 2. Then convert binary result to decimal.",
    answer: "11",
    code: "ASF - 011"
  },
  "btf004": {
    title: "BTF-004",
    puzzle: "A hacker encoded a secret port number using a bitwise AND operation:\n\n0111 AND 0100\n\nApply AND bit by bit, then convert the result to decimal.",
    hint: "AND rule: both bits must be 1 to get 1, otherwise 0.",
    answer: "4",
    code: "BTF - 004"
  },
  "bff003": {
    title: "BFF-003",
    puzzle: "A forensic analyst finds an encrypted room number. The original number was LEFT shifted by 3 bits to produce:\n\n11000\n\nReverse the shift to find the original number.",
    hint: "Left shift by 3 = multiply by 8. So to reverse it, divide the decimal value of 11000 by 8.",
    answer: "3",
    code: "BFF - 003"
  },
  "ctf001": {
    title: "CTF-001",
    puzzle: "A detective recovers a damaged binary file from a crime scene. Most bits are corrupted. Only one pattern survived:\n\n0 0 0 1\n\nAll other bits are confirmed zero. What is the decimal value of this binary number?",
    hint: "Convert 0001 from binary to decimal.",
    answer: "1",
    code: "CTF - 001"
  },
  "ctf005": {
    title: "CTF-005",
    puzzle: "A cybercriminal left this clue:\n\n'I am the only single-digit number whose binary representation is BOTH a palindrome AND contains exactly two 1-bits. Find me.'\n\nWhat is the number?",
    hint: "Write out single digit numbers in binary. Check which ones read the same forwards and backwards AND have exactly two 1s.",
    answer: "5",
    code: "CTF - 005"
  }
};
