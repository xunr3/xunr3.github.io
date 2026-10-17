with open("about_BUGC.md") as fi:
	with open("extract.md", "w") as fo:
		for i, line in filter(lambda x : x[0]>4868, enumerate(fi)): fo.write(line)