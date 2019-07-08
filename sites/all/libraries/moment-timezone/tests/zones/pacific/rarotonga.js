"use strict";

var helpers = require("../../helpers/helpers");

exports["Pacific/Rarotonga"] = {
	"guess" : helpers.makeTestGuess("Pacific/Rarotonga", { offset: false, abbr: true }),

	"1978" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1978-11-12T10:29:59+00:00", "23:59:59", "CKT", 630],
		["1978-11-12T10:30:00+00:00", "01:00:00", "CKHST", 570]
	]),

	"1979" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1979-03-04T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1979-03-04T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1979-10-28T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1979-10-28T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1980" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1980-03-02T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1980-03-02T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1980-10-26T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1980-10-26T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1981" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1981-03-01T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1981-03-01T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1981-10-25T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1981-10-25T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1982" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1982-03-07T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1982-03-07T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1982-10-31T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1982-10-31T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1983" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1983-03-06T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1983-03-06T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1983-10-30T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1983-10-30T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1984" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1984-03-04T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1984-03-04T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1984-10-28T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1984-10-28T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1985" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1985-03-03T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1985-03-03T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1985-10-27T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1985-10-27T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1986" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1986-03-02T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1986-03-02T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1986-10-26T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1986-10-26T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1987" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1987-03-01T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1987-03-01T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1987-10-25T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1987-10-25T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1988" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1988-03-06T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1988-03-06T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1988-10-30T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1988-10-30T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1989" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1989-03-05T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1989-03-05T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1989-10-29T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1989-10-29T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1990" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1990-03-04T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1990-03-04T09:30:00+00:00", "23:30:00", "CKT", 600],
		["1990-10-28T09:59:59+00:00", "23:59:59", "CKT", 600],
		["1990-10-28T10:00:00+00:00", "00:30:00", "CKHST", 570]
	]),

	"1991" : helpers.makeTestYear("Pacific/Rarotonga", [
		["1991-03-03T09:29:59+00:00", "23:59:59", "CKHST", 570],
		["1991-03-03T09:30:00+00:00", "23:30:00", "CKT", 600]
	])
};