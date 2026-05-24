#!/usr/bin/env python3
"""
Returns the current local date and time in DD-MM-YYYY HH:mm format.
Called by the tool-analyzer skill to stamp "Last update" in tool profiles.
"""
from datetime import datetime

print(datetime.now().strftime("%d-%m-%Y %H:%M"))
