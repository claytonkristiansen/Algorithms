from math import ceil, floor
class Solution(object):
    def isPalendrome(self, s, leftI, rightI):
        length = rightI - leftI + 1
        if length == 1:
            return True
        if length % 2 == 0:
            if s[leftI:leftI + int(length / 2)] == s[leftI + int(length / 2):rightI + 1]:
                return True
        if length % 2 == 1:
            if s[leftI:leftI + int(floor(length / 2))] == s[leftI + int(ceil(length / 2)):rightI + 1]:
                return True
        return False

    def growPalendrome(self, s, substrIdx, letterSet):
        leftPalIdx = substrIdx[0]
        rightPalIdx = substrIdx[1]
        strLen = len(s)

        # Expand quickly if both sides match
        if leftPalIdx > 0 and rightPalIdx < (strLen - 1):
            if s[leftPalIdx - 1] == s[rightPalIdx + 1]:
                substrIdx[0] -= 1
                substrIdx[1] += 1
                if not (s[leftPalIdx - 1] in letterSet):
                    letterSet.append(s[leftPalIdx - 1])
                return True
        # If still only found one letter and matches on left, expand to left
        if leftPalIdx > 0 and len(letterSet) <= 1:
            if s[leftPalIdx] == s[leftPalIdx - 1]:
                substrIdx[0] -= 1
                if not (s[leftPalIdx - 1] in letterSet):
                    letterSet.append(s[leftPalIdx - 1])
                return True
        # If still only found one letter and matches on right, expand to right
        if rightPalIdx < (strLen - 1) and len(letterSet) <= 1:
            if (s[rightPalIdx] == s[rightPalIdx + 1]):
                substrIdx[1] += 1
                if not (s[rightPalIdx + 1] in letterSet):
                    letterSet.append(s[rightPalIdx + 1])
                return True

        if rightPalIdx < (strLen - 2):
            if rightPalIdx < (strLen / 2):
                iterStart = rightPalIdx
                iterEnd = leftPalIdx - 1
                step = -1
            else:
                iterStart = leftPalIdx
                iterEnd = rightPalIdx + 1
                step = 1
            for index in range(iterStart, iterEnd, step):
                if s[rightPalIdx + 1] == s[index]:
                    checkIdx = index
                    sizeDiscovered = 1
                    done = False
                    while not done:
                        if checkIdx == leftPalIdx:
                            if self.isPalendrome(s, index + 1, rightPalIdx):
                                substrIdx[1] = substrIdx[1] + sizeDiscovered
                                return True
                            done = True
                        elif ((checkIdx > 0) and (rightPalIdx + sizeDiscovered + 1) < strLen) and (s[checkIdx - 1] == s[rightPalIdx + sizeDiscovered + 1]):
                            sizeDiscovered += 1
                            checkIdx -= 1
                        else:
                            done = True            

        return False

    def findCorePalindrome(self, s):
        retVal = [0,0]
        longestLeftPal = 0
        done = False
        currentPal = [0,0]
        letterSet = [s[0]]
        while not done:
            if not self.growPalendrome(s, currentPal, letterSet):
                palLen = currentPal[1] - currentPal[0]
                if currentPal[0] == 0 and (palLen > longestLeftPal):
                    retVal[1] = currentPal[1]
                    longestLeftPal = palLen
                
                if currentPal[1] < len(s) - 1:
                    currentPal = [currentPal[1] + 1, currentPal[1] + 1]
                    letterSet = [s[currentPal[1]]]
                else:
                    break
        return retVal


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

s = "annnannaanna"

dut = Solution()
shortestPal = dut.shortestPalindrome(s)
print(shortestPal)
print(len(s))
print(len(shortestPal))