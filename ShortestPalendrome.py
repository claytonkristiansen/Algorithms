class Solution(object):
    def findCorePalindrome(self, s):
        leftChar = s[0]

        # Loop starting from right side
        for i in range(len(s) - 1, -1, -1):
            if s[i] == leftChar:
                done = False
                leftWalkIndex = 0
                rightWalkIndex = i
                while True:
                    if leftWalkIndex >= rightWalkIndex:
                        return (0,i)
                    elif s[leftWalkIndex] != s[rightWalkIndex]:
                        break
                    else:
                        leftWalkIndex += 1
                        rightWalkIndex -= 1
        return (0, len(s) - 1)

    def shortestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        if len(s) == 0:
            return ""

        corePalindrome = self.findCorePalindrome(s)
        print(corePalindrome)
        retVal = s[:corePalindrome[1] + 1]
        if corePalindrome[1] < len(s) - 1:
            lonelyStr = s[corePalindrome[1] + 1:]
            retVal = lonelyStr[::-1] + retVal + lonelyStr
        return retVal

s = "abcacbag"

dut = Solution()
shortestPal = dut.shortestPalindrome(s)
print(shortestPal)