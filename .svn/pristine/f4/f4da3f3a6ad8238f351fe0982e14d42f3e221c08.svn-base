
students1 = ["alogue","phan","aravi","araveesh","dpappas","mjurrens","sshukla","ekennedy","ckennedy","mwilson","pdeaville","apique","jabolofia","aharrison","dpotter","jzhang","gma","tliu","hrokni","memery"]
students2 = ["blogue","qhan","bravi","braveesh","epappas","njurrens","tshukla","fkennedy","dkennedy","nwilson","qdeaville","bpique","kabolofia","bharrison","epotter","kzhang","hma","uliu","irokni","nemery"]
students3 = ["clogue","rhan","cravi","craveesh","fpappas","ojurrens","ushukla","gkennedy","ekennedy","owilson","rdeaville","cpique","labolofia","charrison","fpotter","lzhang","ima","vliu","jrokni","oemery"]
print(len(students1))


r1 = open("roster1.csv","w+")
r2 = open("roster2.csv","w+")
r3 = open("roster3.csv","w+")

r1.write("did,uid,name,email,section\n")
r2.write("did,uid,name,email,section\n")
r3.write("did,uid,name,email,section\n")
for i in range(20):
	s1 = students1[i] + "," + str((i+1)) + "," + students1[i][1:] + "," + "nah@umd.edu" + "," + "101"
	s2 = students2[i] + "," + str((i+1)) + "," + students2[i][1:] + "," + "nah@umd.edu" + "," + "102"
	s3 = students3[i] + "," + str((i+1)) + "," + students3[i][1:] + "," + "nah@umd.edu" + "," + "201"
	#print(s1)
	r1.write(s1 + "\n")
	r2.write(s2 + "\n")
	r3.write(s3 + "\n")

sections = open("sections.csv","w+")

#\n104,1,0:15,3:15,30,30,10,TTh\n201,2,5:30,9:30,30,30,10,TTh\n202,2,10:45,15:45,30,30,10,TTh\n203,2,16:00,22:00,30,30,10,TTh")
sections.write("section,lecture,start,end,lat,lng,radius,days\n")
sections.write("101,1,8:30,9:30,38.990711,-76.936587,10,TTh\n102,1,13:45,14:45,38.98007,-77.008711,5,TTh\n201,1,19:00,21:00,39.001227,-75.990987,20,TTh")
sections.close()
r1.close()
r2.close()
r3.close()
#38.990711, -76.936587