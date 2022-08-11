#!/usr/bin/python3

import glob
import os
import re
import sys

srcJsonDirectory = sys.argv[1] if len(sys.argv) > 1 else ""
if not os.path.isdir(srcJsonDirectory):
    print('src/json is not found')
    sys.exit(1)

#
# Check files
#

filePaths = glob.glob("{}/*".format(srcJsonDirectory))
for filePath in filePaths:
    #
    # Check file extension
    #

    if re.search(r'\.json$', filePath):
        basename = os.path.basename(filePath)
        print('')
        print('----------------------------------------')
        print('ERROR:')
        print("Please move {}/{} to public/json/{}".format(
            srcJsonDirectory,
            basename,
            basename))
        print('----------------------------------------')
        print('')
        sys.exit(1)
