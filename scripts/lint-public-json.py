#!/usr/bin/python3

import glob
import json
import os
import re
import subprocess
import sys

publicJsonDirectory = sys.argv[1] if len(sys.argv) > 1 else ""
if not os.path.isdir(publicJsonDirectory):
    print('"{}" is not found'.format(publicJsonDirectory))
    sys.exit(1)

#
# Check files
#

filePaths = glob.glob("{}/*".format(publicJsonDirectory))
for filePath in filePaths:
    #
    # Check file extension
    #

    if not re.search(r'\.json$', filePath):
        basename = os.path.basename(filePath)
        print('')
        print('----------------------------------------')
        print('ERROR:')
        print("Please rename {}/{} to {}/{}.json".format(
            publicJsonDirectory,
            basename,
            publicJsonDirectory,
            basename))
        print('----------------------------------------')
        print('')
        sys.exit(1)

    #
    # Check json validity
    #

    with open(filePath) as f:
        try:
            j = json.load(f)

            #
            # Check KE-complex_modifications specific format
            #

            if 'title' not in j:
                raise ValueError('`title` is not found')
            if type(j['title']) is not str:
                raise ValueError('`title` is not string')

            if 'rules' not in j:
                raise ValueError('`rules` is not found')
            if type(j['rules']) is not list:
                raise ValueError('`rules` is not array')

        except Exception as e:
            print('')
            print('----------------------------------------')
            print('ERROR:')
            print("{} error: {}".format(filePath, e))
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


#
# Apply lint
#

result = subprocess.run([
    "{}/apply-lint.sh".format(os.path.dirname(__file__)),
    "{}/*.json".format(publicJsonDirectory)
])
sys.exit(result.returncode)
