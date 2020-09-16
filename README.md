# exercise-1

There are 2 ways to run this program:

1. Pass in a textfile as a single argument containing a series of lines, each line containing a pair of product code and order quantity. The program will not fulfill the order results of an incorrect product code-quantity pair.

    node test.js inputs.txt

2. Pass in a group of pairs (product code and quantity) as arguments to the program. If given an incorrect product code or quantity, the program will return a total cost of $0.00 and an empty bundle list leaving the order unfulfilled.

    node test.js HB24 10 PPM3 15 BP19 13
