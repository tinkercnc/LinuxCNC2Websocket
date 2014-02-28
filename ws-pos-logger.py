#!/usr/bin/python
# -*- coding: utf-8 -*-
__doc__ = """
Simple LinuxCNC WebSocket Position Logger
"""
import time
import math
import sys

import linuxcnc
from ws4py.client.threadedclient import WebSocketClient

class PosLogger(object):
	def __init__(self, host):
		self.lcncstat = linuxcnc.stat() # create a connection to the status channel
		self.running = False

		self.client = PosLoggerSocketClient(host)
		self.client.connect()
		
	def run(self):
		try:
			self.running = True
			last = [None, None, None]
			while self.running:
				#azimuth, pitch, roll = self.droid.sensorsReadOrientation().result
				self.lcncstat.poll()
				position = x, y, z =self.lcncstat.position[0:3]
				vel = self.lcncstat.current_vel*60
				

				if self.client.terminated:
					break

				if position != [None, None, None] and position != last:
					last = position
					print  x, y, z, vel
					self.client.send("%.4f %.4f %.4f %.4f" % (x, y, z, vel))

				time.sleep(0.05)
		finally:
			self.terminate()
			
	def terminate(self):
		if not self.lcncstat:
			return
		
		self.running = False
		self.lcncstat = None
		
		if not self.client.terminated:
			self.client.close()
			self.client._th.join()
			self.client = None
		
class PosLoggerSocketClient(WebSocketClient):
		def received_message(self, m):
			pass

if __name__ == '__main__':
	argc = len(sys.argv)
	if argc == 2:
		h = sys.argv[1]
	else:
		h='localhost'
		
	aps = PosLogger(host='ws://%s:9000/ws' % h)
	try:
		aps.run()
	except KeyboardInterrupt:
		aps.terminate()
