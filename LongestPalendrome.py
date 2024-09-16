from math import ceil, floor

def strMidpoint(s, favorLeft):
    midpoint = floor(len(s) / 2)
    if favorLeft and (len(s) % 2) == 0 and midpoint > 0:
        midpoint -= 1
    return midpoint

def growPalendrome(s, substrIdx):
    leftPalIdx = substrIdx[0]
    rightPalIdx = substrIdx[1]
    leftMidpoint = strMidpoint(s, True)
    rightMidpoint = strMidpoint(s, False)
    # If indices of palendrome substring are within bounds
    if leftPalIdx > 0:
        if s[leftPalIdx] == s[leftPalIdx - 1]:
            substrIdx[0] -= 1
            return True
    if rightPalIdx < (len(s) - 1):
        if (s[rightPalIdx] == s[rightPalIdx + 1]):
            substrIdx[1] += 1
            return True
    if leftPalIdx > 0 and rightPalIdx < (len(s) - 1):
        if s[leftPalIdx - 1] == s[rightPalIdx + 1]:
            substrIdx[0] -= 1
            substrIdx[1] += 1
            return True      
    
    # for i in range(leftPalIdx - leftMidpoint, 0, -1):
        

    return False

def longestPalindrome(s):
    """
    :type s: str
    :rtype: str
    """
    potentialPal = [[i,i] for i in range(0, len(s))]
    longestSubstrLen = 0
    longestSubstr = [0,0]
    longestSubstr2Len2 = 0
    longestSubstr2 = [0,0]
    currentPal = [0,0]
    done = False
    while not done:
        if not growPalendrome(s, currentPal):
            length = currentPal[1] - currentPal[0] + 1
            if length > longestSubstrLen:
                longestSubstrLen = length
                longestSubstr = currentPal[:]
            if currentPal[1] < len(s) - 1:
                currentPal = [currentPal[1] + 1, currentPal[1] + 1]
            else:
                done = True
    while len(potentialPal) != 0:
        for substrIdx in potentialPal[:]:
            if not growPalendrome(s, substrIdx):
                potentialPal.remove(substrIdx)
                length = substrIdx[1] - substrIdx[0] + 1
                if (length > longestSubstr2Len2):
                    longestSubstr2Len2 = length
                    longestSubstr2 = substrIdx
    print(s[longestSubstr[0]:longestSubstr[1] + 1])
    print(s[longestSubstr2[0]:longestSubstr2[1] + 1])
    return s[longestSubstr2[0]:longestSubstr2[1] + 1]

s = "bannannannanna"
longestPalStr = longestPalindrome(s)