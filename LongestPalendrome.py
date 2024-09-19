numLoops = 0
class Solution(object):
    def growPalendrome(self, s, substrIdx, letterSet):
        global numLoops
        leftPalIdx = substrIdx[0]
        rightPalIdx = substrIdx[1]
        numLoops += 1

        if leftPalIdx > 0 and rightPalIdx < (len(s) - 1):
            if s[leftPalIdx - 1] == s[rightPalIdx + 1]:
                substrIdx[0] -= 1
                substrIdx[1] += 1
                if not (s[leftPalIdx - 1] in letterSet):
                    letterSet.append(s[leftPalIdx - 1])
                return True
        if leftPalIdx > 0 and len(letterSet) <= 1:
            if s[leftPalIdx] == s[leftPalIdx - 1]:
                substrIdx[0] -= 1
                if not (s[leftPalIdx - 1] in letterSet):
                    letterSet.append(s[leftPalIdx - 1])
                return True
        if rightPalIdx < (len(s) - 1) and len(letterSet) <= 1:
            if (s[rightPalIdx] == s[rightPalIdx + 1]):
                substrIdx[1] += 1
                if not (s[rightPalIdx + 1] in letterSet):
                    letterSet.append(s[rightPalIdx + 1])
                return True

        if rightPalIdx < (len(s) - 2):
            searchIndices = []
            for index in range(rightPalIdx, leftPalIdx - 1, -1):
                if s[rightPalIdx + 1] == s[index]:
                    searchIndices.append(index)
            for index in searchIndices:
                checkIdx = index
                sizeDiscovered = 1
                done = False
                while not done:
                    if checkIdx == leftPalIdx:
                        substrIdx[1] = substrIdx[1] + sizeDiscovered
                        letterSet.extend(list(s[rightPalIdx:substrIdx[1]]))
                        return True
                    elif s[checkIdx - 1] == s[rightPalIdx + sizeDiscovered + 1]:
                        sizeDiscovered += 1
                        checkIdx -= 1
                    else:
                        done = True
        if leftPalIdx > 1:
            searchIndices = []
            for index in range(leftPalIdx, rightPalIdx + 1):
                if s[leftPalIdx - 1] == s[index]:
                    searchIndices.append(index)
            for index in searchIndices:
                checkIdx = index
                sizeDiscovered = 1
                done = False
                while not done:
                    if checkIdx == rightPalIdx:
                        substrIdx[0] = substrIdx[0] - sizeDiscovered
                        letterSet.extend(list(s[substrIdx[0]:leftPalIdx]))
                        return True
                    elif s[checkIdx + 1] == s[leftPalIdx - sizeDiscovered - 1]:
                        sizeDiscovered += 1
                        checkIdx += 1
                    else:
                        done = True
            

        return False

    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        longestSubstrLen = 0
        longestSubstr = [0,0]
        currentPal = [0,0]
        letterSet = [s[0]]
        done = False
        while not done:
            if not self.growPalendrome(s, currentPal, letterSet):
                length = currentPal[1] - currentPal[0] + 1
                if length > longestSubstrLen:
                    longestSubstrLen = length
                    longestSubstr = currentPal[:]
                if currentPal[1] < len(s) - 1:
                    currentPal = [currentPal[1] + 1, currentPal[1] + 1]
                    letterSet = [s[currentPal[1]]]
                else:
                    done = True
        return s[longestSubstr[0]:longestSubstr[1] + 1]



dut = Solution()
s = "anananana"
longestPalStr = dut.longestPalindrome(s)
print(longestPalStr)
print(f"runloop: {numLoops}")
print(f"Str len: {len(s)}")