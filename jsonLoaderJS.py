import os


# this program is made to work with front-end web music player

# this function saves file
def fileManagement(data):
    myFile= open(f"./cheatySongsJSON.js", "w")
    myFile.write(data)
    a = input("Done. Press Enter to continue...")

def infoLoader():
    data = '''var songs=['''
    os.chdir("./static/music")
    bo = '{'
    bc = '}'
    for i in os.listdir():
        fileName, fileExt = i.rsplit(".",1)
        data += f'{bo}songName: "{fileName}", filePath: "./static/music/{fileName}.{fileExt}"{bc},'
    data = data[0:-1]
    data += ']'
    os.chdir("../../")
    fileManagement(data)

infoLoader()