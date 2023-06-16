#!/usr/bin/python3

import glob
import os
import re
import sys

srcJsonDirectory = sys.argv[1] if len(sys.argv) > 1 else ""
if not os.path.isdir(srcJsonDirectory):
    print('"{}" is not found'.format(srcJsonDirectory))
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

    #
    # Check there are no any extra directories
    #

    if os.path.isdir(filePath):
        print('')
        print('----------------------------------------')
        print('ERROR:')
        print("An extra directory is found: {}".format(
            filePath))
        print('----------------------------------------')
        print('')
        sys.exit(1)
