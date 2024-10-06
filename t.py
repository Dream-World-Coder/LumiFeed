l1 = [1,2,3]

l2 = [2,3,4]
l3 = [3,4,5]
# l4 = [1,2,3] # true, cuz now python automatically sets l4 = l1
l4 = [1,3,2] # false cuz the pointer is different now.

lx = [l2,l3,l4]

print(l1 in lx)