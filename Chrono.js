﻿const c_nDayTicks = 24 * 60 * 60 * 1000

function GetPlural(nNumber)
{
    return (nNumber === 1) ? "" : "s"
}

function GetEventDays(strEvent, nYear, nMonth, nDay)
{
    let nNowDateTimeTicks = Date.now()
    let nEventDateTicks = new Date(nYear, nMonth - 1, nDay).getTime()
    let nEventDiffDays = Math.ceil((nEventDateTicks - nNowDateTimeTicks) / c_nDayTicks)

    return "<b>" + strEvent + "</b> is in " + nEventDiffDays + " day" + GetPlural(nEventDiffDays)
}

function GetChrono()
{
    const c_nDailySunTimes =
    [
        0x03E501CC, 0x03E601CC, 0x03E701CC, 0x03E801CC, 0x03E901CC, 0x03EA01CC, 0x03EB01CC,
        0x03EC01CC, 0x03ED01CB, 0x03EF01CB, 0x03F001CB, 0x03F101CA, 0x03F201CA, 0x03F301CA,
        0x03F401C9, 0x03F601C9, 0x03F701C8, 0x03F801C7, 0x03F901C7, 0x03FB01C6, 0x03FC01C5,
        0x03FD01C5, 0x03FF01C4, 0x040001C3, 0x040101C2, 0x040301C1, 0x040401C0, 0x040501BF,
        0x040701BE, 0x040801BD, 0x040A01BC, 0x040B01BB, 0x040C01BA, 0x040E01B9, 0x040F01B8,
        0x041101B6, 0x041201B5, 0x041301B4, 0x041501B3, 0x041601B1, 0x041701B0, 0x041901AF,
        0x041A01AD, 0x041C01AC, 0x041D01AA, 0x041E01A9, 0x042001A7, 0x042101A6, 0x042201A4,
        0x042401A3, 0x042501A1, 0x042701A0, 0x0428019E, 0x0429019D, 0x042B019B, 0x042C0199,
        0x042D0198, 0x042F0196, 0x04300194, 0x04310193, 0x04320191, 0x0434018F, 0x0435018E,
        0x0436018C, 0x0438018A, 0x04390188, 0x043A0187, 0x047701C1, 0x047901BF, 0x047A01BD,
        0x047B01BC, 0x047D01BA, 0x047E01B8, 0x047F01B6, 0x048001B4, 0x048201B3, 0x048301B1,
        0x048401AF, 0x048501AD, 0x048601AB, 0x048801A9, 0x048901A8, 0x048A01A6, 0x048B01A4,
        0x048D01A2, 0x048E01A0, 0x048F019F, 0x0490019D, 0x0492019B, 0x04930199, 0x04940197,
        0x04950195, 0x04960194, 0x04980192, 0x04990190, 0x049A018E, 0x049B018C, 0x049C018B,
        0x049E0189, 0x049F0187, 0x04A00185, 0x04A10184, 0x04A30182, 0x04A40180, 0x04A5017F,
        0x04A6017D, 0x04A7017B, 0x04A9017A, 0x04AA0178, 0x04AB0176, 0x04AC0175, 0x04AD0173,
        0x04AF0171, 0x04B00170, 0x04B1016E, 0x04B2016D, 0x04B3016B, 0x04B5016A, 0x04B60168,
        0x04B70167, 0x04B80165, 0x04B90164, 0x04BB0162, 0x04BC0161, 0x04BD0160, 0x04BE015E,
        0x04BF015D, 0x04C0015C, 0x04C2015B, 0x04C30159, 0x04C40158, 0x04C50157, 0x04C60156,
        0x04C70155, 0x04C80153, 0x04CA0152, 0x04CB0151, 0x04CC0150, 0x04CD014F, 0x04CE014E,
        0x04CF014D, 0x04D0014D, 0x04D1014C, 0x04D2014B, 0x04D3014A, 0x04D40149, 0x04D50149,
        0x04D60148, 0x04D70147, 0x04D70147, 0x04D80146, 0x04D90145, 0x04DA0145, 0x04DB0144,
        0x04DC0144, 0x04DC0144, 0x04DD0143, 0x04DE0143, 0x04DE0143, 0x04DF0142, 0x04DF0142,
        0x04E00142, 0x04E10142, 0x04E10142, 0x04E20142, 0x04E20142, 0x04E20142, 0x04E30142,
        0x04E30142, 0x04E30142, 0x04E40142, 0x04E40142, 0x04E40142, 0x04E40143, 0x04E40143,
        0x04E40143, 0x04E40144, 0x04E40144, 0x04E40144, 0x04E40145, 0x04E40145, 0x04E40146,
        0x04E40146, 0x04E40147, 0x04E30148, 0x04E30148, 0x04E30149, 0x04E2014A, 0x04E2014A,
        0x04E2014B, 0x04E1014C, 0x04E1014D, 0x04E0014D, 0x04DF014E, 0x04DF014F, 0x04DE0150,
        0x04DD0151, 0x04DD0152, 0x04DC0153, 0x04DB0154, 0x04DA0155, 0x04D90155, 0x04D80156,
        0x04D70157, 0x04D60158, 0x04D5015A, 0x04D4015B, 0x04D3015C, 0x04D2015D, 0x04D1015E,
        0x04D0015F, 0x04CF0160, 0x04CE0161, 0x04CC0162, 0x04CB0163, 0x04CA0164, 0x04C90165,
        0x04C70166, 0x04C60168, 0x04C40169, 0x04C3016A, 0x04C2016B, 0x04C0016C, 0x04BF016D,
        0x04BD016E, 0x04BC016F, 0x04BA0171, 0x04B90172, 0x04B70173, 0x04B50174, 0x04B40175,
        0x04B20176, 0x04B10177, 0x04AF0179, 0x04AD017A, 0x04AC017B, 0x04AA017C, 0x04A8017D,
        0x04A7017E, 0x04A5017F, 0x04A30181, 0x04A10182, 0x04A00183, 0x049E0184, 0x049C0185,
        0x049A0186, 0x04980187, 0x04970189, 0x0495018A, 0x0493018B, 0x0491018C, 0x048F018D,
        0x048D018E, 0x048C018F, 0x048A0191, 0x04880192, 0x04860193, 0x04840194, 0x04820195,
        0x04810196, 0x047F0197, 0x047D0199, 0x047B019A, 0x0479019B, 0x0477019C, 0x0475019D,
        0x0474019E, 0x0472019F, 0x047001A1, 0x046E01A2, 0x046C01A3, 0x046A01A4, 0x046901A5,
        0x046701A6, 0x046501A8, 0x046301A9, 0x046101AA, 0x045F01AB, 0x045E01AC, 0x045C01AE,
        0x045A01AF, 0x045801B0, 0x045701B1, 0x045501B3, 0x045301B4, 0x045101B5, 0x045001B6,
        0x044E01B7, 0x044C01B9, 0x044B01BA, 0x044901BB, 0x044701BC, 0x044601BE, 0x044401BF,
        0x044301C0, 0x044101C2, 0x043F01C3, 0x043E01C4, 0x043C01C6, 0x043B01C7, 0x043901C8,
        0x043801C9, 0x043701CB, 0x043501CC, 0x043401CD, 0x03F60193, 0x03F50194, 0x03F40195,
        0x03F20197, 0x03F10198, 0x03F00199, 0x03EF019B, 0x03EE019C, 0x03EC019D, 0x03EB019F,
        0x03EA01A0, 0x03E901A1, 0x03E801A3, 0x03E701A4, 0x03E601A5, 0x03E501A7, 0x03E401A8,
        0x03E401A9, 0x03E301AA, 0x03E201AC, 0x03E101AD, 0x03E101AE, 0x03E001AF, 0x03DF01B1,
        0x03DF01B2, 0x03DE01B3, 0x03DE01B4, 0x03DD01B5, 0x03DD01B7, 0x03DC01B8, 0x03DC01B9,
        0x03DC01BA, 0x03DB01BB, 0x03DB01BC, 0x03DB01BD, 0x03DB01BE, 0x03DB01BF, 0x03DB01C0,
        0x03DB01C1, 0x03DB01C2, 0x03DB01C3, 0x03DB01C3, 0x03DB01C4, 0x03DB01C5, 0x03DC01C6,
        0x03DC01C6, 0x03DC01C7, 0x03DD01C8, 0x03DD01C8, 0x03DE01C9, 0x03DE01C9, 0x03DF01CA,
        0x03DF01CA, 0x03E001CB, 0x03E101CB, 0x03E101CB, 0x03E201CC, 0x03E301CC, 0x03E401CC,
        0x03E401CC, 0x03E501CC, 0x03E601CC, 0x03E701CC, 0x03E801CC, 0x03E901CC, 0x03EA01CC,
        0x03EB01CC, 0x03EC01CC, 0x03ED01CB, 0x03EE01CB, 0x03EF01CB, 0x03F101CB, 0x03F201CA,
        0x03F301CA, 0x03F401C9, 0x03F501C9, 0x03F701C8, 0x03F801C8, 0x03F901C7, 0x03FA01C6,
        0x03FC01C6, 0x03FD01C5, 0x03FE01C4, 0x040001C3, 0x040101C2, 0x040201C1, 0x040401C0,
        0x040501C0, 0x040701BF, 0x040801BD, 0x040901BC, 0x040B01BB, 0x040C01BA, 0x040D01B9,
        0x040F01B8, 0x041001B7, 0x041201B5, 0x041301B4, 0x041401B3, 0x041601B2, 0x041701B0,
        0x041901AF, 0x041A01AE, 0x041B01AC, 0x041D01AB, 0x041E01A9, 0x041F01A8, 0x042101A6,
        0x042201A5, 0x042401A3, 0x042501A2, 0x042601A0, 0x0428019F, 0x0429019D, 0x042A019B,
        0x042C019A, 0x042D0198, 0x042E0197, 0x04300195, 0x04310193, 0x04320191, 0x04330190,
        0x0435018E, 0x0436018C, 0x0437018B, 0x04390189, 0x043A0187, 0x043B0185, 0x043C0184,
        0x043E0182, 0x043F0180, 0x0440017E, 0x0441017C, 0x047F01B7, 0x048001B5, 0x048101B3,
        0x048201B1, 0x048401AF, 0x048501AE, 0x048601AC, 0x048701AA, 0x048901A8, 0x048A01A6,
        0x048B01A4, 0x048C01A3, 0x048E01A1, 0x048F019F, 0x0490019D, 0x0491019B, 0x04920199,
        0x04940198, 0x04950196, 0x04960194, 0x04970192, 0x04980190, 0x049A018F, 0x049B018D,
        0x049C018B, 0x049D0189, 0x049F0188, 0x04A00186, 0x04A10184, 0x04A20182, 0x04A30181,
        0x04A5017F, 0x04A6017D, 0x04A7017C, 0x04A8017A, 0x04A90178, 0x04AB0177, 0x04AC0175,
        0x04AD0173, 0x04AE0172, 0x04B00170, 0x04B1016F, 0x04B2016D, 0x04B3016C, 0x04B4016A,
        0x04B60169, 0x04B70167, 0x04B80166, 0x04B90164, 0x04BA0163, 0x04BB0161, 0x04BD0160,
        0x04BE015F, 0x04BF015D, 0x04C0015C, 0x04C1015B, 0x04C3015A, 0x04C40158, 0x04C50157,
        0x04C60156, 0x04C70155, 0x04C80154, 0x04C90153, 0x04CA0152, 0x04CB0151, 0x04CD0150,
        0x04CE014F, 0x04CF014E, 0x04D0014D, 0x04D1014C, 0x04D2014B, 0x04D3014A, 0x04D40149,
        0x04D50149, 0x04D50148, 0x04D60147, 0x04D70147, 0x04D80146, 0x04D90146, 0x04DA0145,
        0x04DB0145, 0x04DB0144, 0x04DC0144, 0x04DD0143, 0x04DD0143, 0x04DE0143, 0x04DF0142,
        0x04DF0142, 0x04E00142, 0x04E00142, 0x04E10142, 0x04E10142, 0x04E20142, 0x04E20142,
        0x04E30142, 0x04E30142, 0x04E30142, 0x04E40142, 0x04E40142, 0x04E40142, 0x04E40143,
        0x04E40143, 0x04E40143, 0x04E40144, 0x04E40144, 0x04E40144, 0x04E40145, 0x04E40145,
        0x04E40146, 0x04E40146, 0x04E40147, 0x04E30147, 0x04E30148, 0x04E30149, 0x04E20149,
        0x04E2014A, 0x04E2014B, 0x04E1014C, 0x04E1014C, 0x04E0014D, 0x04E0014E, 0x04DF014F,
        0x04DE0150, 0x04DE0151, 0x04DD0151, 0x04DC0152, 0x04DB0153, 0x04DA0154, 0x04DA0155,
        0x04D90156, 0x04D80157, 0x04D70158, 0x04D60159, 0x04D5015A, 0x04D4015B, 0x04D3015C,
        0x04D1015D, 0x04D0015E, 0x04CF0160, 0x04CE0161, 0x04CD0162, 0x04CB0163, 0x04CA0164,
        0x04C90165, 0x04C70166, 0x04C60167, 0x04C50168, 0x04C3016A, 0x04C2016B, 0x04C0016C,
        0x04BF016D, 0x04BE016E, 0x04BC016F, 0x04BB0170, 0x04B90171, 0x04B70173, 0x04B60174,
        0x04B40175, 0x04B30176, 0x04B10177, 0x04AF0178, 0x04AE0179, 0x04AC017B, 0x04AA017C,
        0x04A9017D, 0x04A7017E, 0x04A5017F, 0x04A30180, 0x04A20181, 0x04A00183, 0x049E0184,
        0x049C0185, 0x049B0186, 0x04990187, 0x04970188, 0x04950189, 0x0493018B, 0x0492018C,
        0x0490018D, 0x048E018E, 0x048C018F, 0x048A0190, 0x04880191, 0x04870193, 0x04850194,
        0x04830195, 0x04810196, 0x047F0197, 0x047D0198, 0x047B0199, 0x047A019B, 0x0478019C,
        0x0476019D, 0x0474019E, 0x0472019F, 0x047001A0, 0x046E01A2, 0x046D01A3, 0x046B01A4,
        0x046901A5, 0x046701A6, 0x046501A7, 0x046401A9, 0x046201AA, 0x046001AB, 0x045E01AC,
        0x045C01AD, 0x045B01AF, 0x045901B0, 0x045701B1, 0x045501B2, 0x045401B3, 0x045201B5,
        0x045001B6, 0x044E01B7, 0x044D01B8, 0x044B01BA, 0x044901BB, 0x044801BC, 0x044601BD,
        0x044401BF, 0x044301C0, 0x044101C1, 0x044001C3, 0x043E01C4, 0x043D01C5, 0x043B01C6,
        0x043A01C8, 0x043801C9, 0x043701CA, 0x043501CC, 0x043401CD, 0x043301CE, 0x043101D0,
        0x043001D1, 0x042F01D2, 0x042D01D4, 0x042C01D5, 0x03EF019A, 0x03EE019C, 0x03ED019D,
        0x03EC019E, 0x03EB01A0, 0x03E901A1, 0x03E801A2, 0x03E701A4, 0x03E601A5, 0x03E601A6,
        0x03E501A8, 0x03E401A9, 0x03E301AA, 0x03E201AB, 0x03E101AD, 0x03E101AE, 0x03E001AF,
        0x03DF01B0, 0x03DF01B2, 0x03DE01B3, 0x03DE01B4, 0x03DD01B5, 0x03DD01B6, 0x03DC01B7,
        0x03DC01B9, 0x03DC01BA, 0x03DC01BB, 0x03DB01BC, 0x03DB01BD, 0x03DB01BE, 0x03DB01BF,
        0x03DB01C0, 0x03DB01C1, 0x03DB01C2, 0x03DB01C2, 0x03DB01C3, 0x03DB01C4, 0x03DB01C5,
        0x03DC01C6, 0x03DC01C6, 0x03DC01C7, 0x03DD01C7, 0x03DD01C8, 0x03DE01C9, 0x03DE01C9,
        0x03DF01CA, 0x03DF01CA, 0x03E001CA, 0x03E001CB, 0x03E101CB, 0x03E201CB, 0x03E301CC,
        0x03E301CC, 0x03E401CC, 0x03E501CC, 0x03E601CC, 0x03E701CC, 0x03E801CC, 0x03E901CC,
        0x03EA01CC, 0x03EB01CC, 0x03EC01CC, 0x03ED01CC, 0x03EE01CB, 0x03EF01CB, 0x03F001CB,
        0x03F101CA, 0x03F301CA, 0x03F401C9, 0x03F501C9, 0x03F601C8, 0x03F801C8, 0x03F901C7,
        0x03FA01C6, 0x03FB01C6, 0x03FD01C5, 0x03FE01C4, 0x03FF01C3, 0x040101C2, 0x040201C2,
        0x040301C1, 0x040501C0, 0x040601BF, 0x040801BE, 0x040901BD, 0x040A01BC, 0x040C01BB,
        0x040D01B9, 0x040E01B8, 0x041001B7, 0x041101B6, 0x041301B5, 0x041401B3, 0x041501B2,
        0x041701B1, 0x041801AF, 0x041A01AE, 0x041B01AD, 0x041C01AB, 0x041E01AA, 0x041F01A8,
        0x042001A7, 0x042201A5, 0x042301A4, 0x042501A2, 0x042601A1, 0x0427019F, 0x0429019D,
        0x042A019C, 0x042B019A, 0x042D0199, 0x042E0197, 0x042F0195, 0x04300194, 0x04320192,
        0x04330190, 0x0434018E, 0x0436018D, 0x0437018B, 0x04380189, 0x043A0188, 0x043B0186,
        0x043C0184, 0x043D0182, 0x043F0180, 0x0440017F, 0x047D01B9, 0x047E01B7, 0x048001B5,
        0x048101B3, 0x048201B2, 0x048301B0, 0x048501AE, 0x048601AC, 0x048701AA, 0x048801A8,
        0x048A01A7, 0x048B01A5, 0x048C01A3, 0x048D01A1, 0x048E019F, 0x0490019E, 0x0491019C,
        0x0492019A, 0x04930198, 0x04950196, 0x04960195, 0x04970193, 0x04980191, 0x0499018F,
        0x049B018D, 0x049C018C, 0x049D018A, 0x049E0188, 0x049F0186, 0x04A10185, 0x04A20183,
        0x04A30181, 0x04A4017F, 0x04A6017E, 0x04A7017C, 0x04A8017A, 0x04A90179, 0x04AA0177,
        0x04AC0175, 0x04AD0174, 0x04AE0172, 0x04AF0171, 0x04B0016F, 0x04B2016D, 0x04B3016C,
        0x04B4016A, 0x04B50169, 0x04B60167, 0x04B80166, 0x04B90165, 0x04BA0163, 0x04BB0162,
        0x04BC0160, 0x04BE015F, 0x04BF015E, 0x04C0015C, 0x04C1015B, 0x04C2015A, 0x04C30159,
        0x04C50157, 0x04C60156, 0x04C70155, 0x04C80154, 0x04C90153, 0x04CA0152, 0x04CB0151,
        0x04CC0150, 0x04CD014F, 0x04CE014E, 0x04CF014D, 0x04D0014C, 0x04D1014B, 0x04D2014A,
        0x04D3014A, 0x04D40149, 0x04D50148, 0x04D60148, 0x04D70147, 0x04D80146, 0x04D90146,
        0x04DA0145, 0x04DA0145, 0x04DB0144, 0x04DC0144, 0x04DD0143, 0x04DD0143, 0x04DE0143,
        0x04DF0142, 0x04DF0142, 0x04E00142, 0x04E00142, 0x04E10142, 0x04E10142, 0x04E20142,
        0x04E20142, 0x04E30142, 0x04E30142, 0x04E30142, 0x04E40142, 0x04E40142, 0x04E40142,
        0x04E40143, 0x04E40143, 0x04E40143, 0x04E40143, 0x04E40144, 0x04E40144, 0x04E40145,
        0x04E40145, 0x04E40146, 0x04E40146, 0x04E40147, 0x04E40147, 0x04E30148, 0x04E30149,
        0x04E30149, 0x04E2014A, 0x04E2014B, 0x04E1014B, 0x04E1014C, 0x04E0014D, 0x04E0014E,
        0x04DF014F, 0x04DE0150, 0x04DE0150, 0x04DD0151, 0x04DC0152, 0x04DB0153, 0x04DB0154,
        0x04DA0155, 0x04D90156, 0x04D80157, 0x04D70158, 0x04D60159, 0x04D5015A, 0x04D4015B,
        0x04D3015C, 0x04D2015D, 0x04D1015E, 0x04CF015F, 0x04CE0160, 0x04CD0162, 0x04CC0163,
        0x04CA0164, 0x04C90165, 0x04C80166, 0x04C60167, 0x04C50168, 0x04C40169, 0x04C2016A,
        0x04C1016C, 0x04BF016D, 0x04BE016E, 0x04BC016F, 0x04BB0170, 0x04B90171, 0x04B80172,
        0x04B60173, 0x04B50175, 0x04B30176, 0x04B10177, 0x04B00178, 0x04AE0179, 0x04AC017A,
        0x04AB017B, 0x04A9017D, 0x04A7017E, 0x04A6017F, 0x04A40180, 0x04A20181, 0x04A00182,
        0x049F0184, 0x049D0185, 0x049B0186, 0x04990187, 0x04980188, 0x04960189, 0x0494018A,
        0x0492018B, 0x0490018D, 0x048E018E, 0x048D018F, 0x048B0190, 0x04890191, 0x04870192,
        0x04850193, 0x04830195, 0x04810196, 0x04800197, 0x047E0198, 0x047C0199, 0x047A019A,
        0x0478019B, 0x0476019D, 0x0474019E, 0x0473019F, 0x047101A0, 0x046F01A1, 0x046D01A2,
        0x046B01A4, 0x046901A5, 0x046801A6, 0x046601A7, 0x046401A8, 0x046201AA, 0x046001AB,
        0x045F01AC, 0x045D01AD, 0x045B01AE, 0x045901B0, 0x045701B1, 0x045601B2, 0x045401B3,
        0x045201B4, 0x045001B6, 0x044F01B7, 0x044D01B8, 0x044B01B9, 0x044A01BB, 0x044801BC,
        0x044601BD, 0x044501BE, 0x044301C0, 0x044201C1, 0x044001C2, 0x043F01C4, 0x043D01C5,
        0x043C01C6, 0x043A01C7, 0x043901C9, 0x043701CA, 0x043601CB, 0x043401CD, 0x043301CE,
        0x043201CF, 0x043001D1, 0x042F01D2, 0x042E01D3, 0x03F10199, 0x03EF019A, 0x03EE019B,
        0x03ED019D, 0x03EC019E, 0x03EB019F, 0x03EA01A1, 0x03E901A2, 0x03E801A3, 0x03E701A5,
        0x03E601A6, 0x03E501A7, 0x03E401A8, 0x03E301AA, 0x03E201AB, 0x03E201AC, 0x03E101AE,
        0x03E001AF, 0x03E001B0, 0x03DF01B1, 0x03DE01B2, 0x03DE01B4, 0x03DD01B5, 0x03DD01B6,
        0x03DD01B7, 0x03DC01B8, 0x03DC01B9, 0x03DC01BA, 0x03DB01BB, 0x03DB01BD, 0x03DB01BE,
        0x03DB01BF, 0x03DB01BF, 0x03DB01C0, 0x03DB01C1, 0x03DB01C2, 0x03DB01C3, 0x03DB01C4,
        0x03DB01C5, 0x03DC01C5, 0x03DC01C6, 0x03DC01C7, 0x03DD01C7, 0x03DD01C8, 0x03DD01C9,
        0x03DE01C9, 0x03DE01CA, 0x03DF01CA, 0x03E001CA, 0x03E001CB, 0x03E101CB, 0x03E201CB,
        0x03E201CC, 0x03E301CC, 0x03E401CC, 0x03E501CC, 0x03E601CC, 0x03E701CC, 0x03E801CC,
        0x03E801CC, 0x03E901CC, 0x03EA01CC, 0x03EC01CC, 0x03ED01CC, 0x03EE01CB, 0x03EF01CB,
        0x03F001CB, 0x03F101CA, 0x03F201CA, 0x03F401C9, 0x03F501C9, 0x03F601C8, 0x03F701C8,
        0x03F901C7, 0x03FA01C7, 0x03FB01C6, 0x03FC01C5, 0x03FE01C4, 0x03FF01C4, 0x040001C3,
        0x040201C2, 0x040301C1, 0x040401C0, 0x040601BF, 0x040701BE, 0x040901BD, 0x040A01BC,
        0x040B01BB, 0x040D01BA, 0x040E01B8, 0x040F01B7, 0x041101B6, 0x041201B5, 0x041401B4,
        0x041501B2, 0x041601B1, 0x041801B0, 0x041901AE, 0x041B01AD, 0x041C01AB, 0x041D01AA,
        0x041F01A9, 0x042001A7, 0x042101A6, 0x042301A4, 0x042401A3, 0x042601A1, 0x0427019F,
        0x0428019E, 0x042A019C, 0x042B019B, 0x042C0199, 0x042E0197, 0x042F0196, 0x04300194,
        0x04310192, 0x04330191, 0x0434018F, 0x0435018D, 0x0437018B, 0x0438018A, 0x04390188,
        0x043A0186, 0x043C0184, 0x043D0183, 0x043E0181, 0x047C01BB, 0x047D01B9, 0x047E01B7,
        0x047F01B6, 0x048101B4, 0x048201B2, 0x048301B0, 0x048401AE, 0x048601AD, 0x048701AB,
        0x048801A9, 0x048901A7, 0x048A01A5, 0x048C01A3, 0x048D01A2, 0x048E01A0, 0x048F019E,
        0x0491019C, 0x0492019A, 0x04930199, 0x04940197, 0x04950195, 0x04970193, 0x04980191,
        0x04990190, 0x049A018E, 0x049C018C, 0x049D018A, 0x049E0188, 0x049F0187, 0x04A00185,
        0x04A20183, 0x04A30181, 0x04A40180, 0x04A5017E, 0x04A6017C, 0x04A8017B, 0x04A90179,
        0x04AA0177, 0x04AB0176, 0x04AD0174, 0x04AE0173, 0x04AF0171, 0x04B0016F, 0x04B1016E,
        0x04B3016C, 0x04B4016B, 0x04B50169, 0x04B60168, 0x04B70166, 0x04B90165, 0x04BA0163,
        0x04BB0162, 0x04BC0161, 0x04BD015F, 0x04BE015E, 0x04C0015D, 0x04C1015B, 0x04C2015A,
        0x04C30159, 0x04C40158, 0x04C50157, 0x04C70155, 0x04C80154, 0x04C90153, 0x04CA0152,
        0x04CB0151, 0x04CC0150, 0x04CD014F, 0x04CE014E, 0x04CF014D, 0x04D0014C, 0x04D1014B,
        0x04D2014B, 0x04D3014A, 0x04D40149, 0x04D50148, 0x04D60148, 0x04D70147, 0x04D80146,
        0x04D90146, 0x04D90145, 0x04DA0145, 0x04DB0144, 0x04DC0144, 0x04DC0143, 0x04DD0143,
        0x04DE0143, 0x04DE0143, 0x04DF0142, 0x04E00142, 0x04E00142, 0x04E10142, 0x04E10142,
        0x04E20142, 0x04E20142, 0x04E30142, 0x04E30142, 0x04E30142, 0x04E30142, 0x04E40142,
        0x04E40142, 0x04E40142, 0x04E40143, 0x04E40143, 0x04E40143, 0x04E40144, 0x04E40144,
        0x04E40145, 0x04E40145, 0x04E40146, 0x04E40146, 0x04E40147, 0x04E40147, 0x04E30148,
        0x04E30148, 0x04E30149, 0x04E2014A, 0x04E2014B, 0x04E1014B, 0x04E1014C, 0x04E0014D,
        0x04E0014E, 0x04DF014E, 0x04DF014F, 0x04DE0150, 0x04DD0151, 0x04DC0152, 0x04DC0153,
        0x04DB0154, 0x04DA0155, 0x04D90156, 0x04D80157, 0x04D70158, 0x04D60159, 0x04D5015A,
        0x04D4015B, 0x04D3015C, 0x04D2015D, 0x04D1015E, 0x04D0015F, 0x04CF0160, 0x04CD0161,
        0x04CC0162, 0x04CB0163, 0x04C90165, 0x04C80166, 0x04C70167, 0x04C50168, 0x04C40169,
        0x04C3016A, 0x04C1016B, 0x04C0016C, 0x04BE016E, 0x04BD016F, 0x04BB0170, 0x04BA0171,
        0x04B80172, 0x04B70173, 0x04B50174, 0x04B30175, 0x04B20177, 0x04B00178, 0x04AF0179,
        0x04AD017A, 0x04AB017B, 0x04A9017C, 0x04A8017E, 0x04A6017F, 0x04A40180, 0x04A30181,
        0x04A10182, 0x049F0183, 0x049D0184, 0x049C0185, 0x049A0187, 0x04980188, 0x04960189,
        0x0494018A, 0x0492018B, 0x0491018C, 0x048F018D, 0x048D018F, 0x048B0190, 0x04890191,
        0x04870192, 0x04860193, 0x04840194, 0x04820195, 0x04800197, 0x047E0198, 0x047C0199,
        0x047A019A, 0x0479019B, 0x0477019C, 0x0475019E, 0x0473019F, 0x047101A0, 0x046F01A1,
        0x046E01A2, 0x046C01A3, 0x046A01A4, 0x046801A6, 0x046601A7, 0x046401A8, 0x046301A9,
        0x046101AA, 0x045F01AC, 0x045D01AD, 0x045B01AE, 0x045A01AF, 0x045801B0, 0x045601B2,
        0x045401B3, 0x045301B4, 0x045101B5, 0x044F01B7, 0x044D01B8, 0x044C01B9, 0x044A01BA,
        0x044901BC, 0x044701BD, 0x044501BE, 0x044401BF, 0x044201C1, 0x044101C2, 0x043F01C3,
        0x043D01C5, 0x043C01C6, 0x043A01C7, 0x043901C8, 0x043801CA, 0x043601CB, 0x043501CC,
        0x043301CE, 0x043201CF, 0x043101D0, 0x042F01D2, 0x03F20197, 0x03F10198, 0x03F0019A,
        0x03EE019B, 0x03ED019C, 0x03EC019E, 0x03EB019F, 0x03EA01A0, 0x03E901A2, 0x03E801A3,
        0x03E701A4, 0x03E601A6, 0x03E501A7, 0x03E401A8, 0x03E301A9, 0x03E301AB, 0x03E201AC,
        0x03E101AD, 0x03E001AF, 0x03E001B0, 0x03DF01B1, 0x03DF01B2, 0x03DE01B3, 0x03DE01B5,
        0x03DD01B6, 0x03DD01B7, 0x03DC01B8, 0x03DC01B9, 0x03DC01BA, 0x03DB01BB, 0x03DB01BC,
        0x03DB01BD, 0x03DB01BE, 0x03DB01BF, 0x03DB01C0, 0x03DB01C1, 0x03DB01C2, 0x03DB01C3,
        0x03DB01C4, 0x03DB01C4, 0x03DC01C5, 0x03DC01C6, 0x03DC01C7, 0x03DC01C7, 0x03DD01C8,
        0x03DD01C8, 0x03DE01C9, 0x03DE01C9, 0x03DF01CA, 0x03DF01CA, 0x03E001CB, 0x03E101CB,
        0x03E101CB, 0x03E201CC, 0x03E301CC, 0x03E401CC, 0x03E501CC
    ]

    let nTodayDate = new Date();
    let nTodayYear = nTodayDate.getFullYear()
    let nTodayTicks = nTodayDate.getTime()

    let nTableTicks = new Date(2020, 0, 1).getTime()
    let nTodayDiffDays = (Math.floor((nTodayTicks - nTableTicks) / c_nDayTicks)) % 1461

    let nTodaySunTimes = c_nDailySunTimes[nTodayDiffDays]

    let nSunriseTime = nTodaySunTimes & 0x0000FFFF
    let nSunsetTime = nTodaySunTimes >>> 16

    let nSunriseMinute = nSunriseTime % 60
    let nSunriseHour = (nSunriseTime - nSunriseMinute) / 60

    let nSunsetMinute = nSunsetTime % 60
    let nSunsetHour = ((nSunsetTime - nSunsetMinute) / 60) - 12

    let nJulianTicks = new Date(nTodayYear, 0, 1).getTime()
    let nJulianDays = (Math.floor((nTodayTicks - nJulianTicks) / c_nDayTicks)) + 1

    let strAppVersion = navigator["userAgent"]
    let strEdgVersion = strAppVersion.match(/Edg\/((?:\d+\.){3}\d+)/)

    strToday = "<b>Today</b> is " + nTodayDate.toDateString() + " - "
    strToday += "<b>Sunrise</b> is at " + nSunriseHour + ":" + nSunriseMinute.toString().padStart(2, "0") + " AM - "
    strToday += "<b>Sunset</b> is at " + nSunsetHour + ":" + nSunsetMinute.toString().padStart(2, "0") + " PM - "
    strToday += "<b>Julian day</b> is " + nJulianDays + " - "
    strToday += "<b>Edge version</b> is " + strEdgVersion[1] + "<br />"

/*
    strToday += GetEventDays("New Years Day", 2024, 1, 1) + " - "
    strToday += GetEventDays("Martin Luther King Jr. Day", 2024, 1, 15) + " - "
    strToday += GetEventDays("Ground Hog Day", 2024, 2, 2) + " - "
    strToday += GetEventDays("Paul's Birthday", 2024, 2, 9) + " - "
    strToday += GetEventDays("Valentine's Day", 2024, 2, 14) + " - "
    strToday += GetEventDays("President's Day", 2024, 2, 19) + " - "
    strToday += GetEventDays("Start of Daylight Saving Time", 2024, 3, 10) + " - "
    strToday += GetEventDays("St. Patrick's Day", 2024, 3, 17) + " - "
    strToday += GetEventDays("Spring Equinox", 2024, 3, 19) + " - "
    strToday += GetEventDays("Easter Day", 2024, 3, 31) + " - "
    strToday += GetEventDays("Earth Day", 2024, 4, 22) + " - "
*/

    strToday += GetEventDays("Mother's Day", 2023, 5, 14) + " - "
    strToday += GetEventDays("Memorial Day", 2023, 5, 29) + " - "
    strToday += GetEventDays("Father's Day", 2023, 6, 18) + " - "
    strToday += GetEventDays("Juneteenth", 2023, 6, 19) + " - "
    strToday += GetEventDays("Summer Solstice", 2023, 6, 21) + " - "
    strToday += GetEventDays("Independence Day", 2023, 7, 4)

/*
    strToday += GetEventDays("Labor Day", 2023, 9, 4) + " - "
    strToday += GetEventDays("Autumn Equinox", 2023, 9, 22) + " - "
    strToday += GetEventDays("Indigenous Peoples Day", 2023, 10, 9) + " - "
    strToday += GetEventDays("Halloween", 2023, 10, 31) + " - "
    strToday += GetEventDays("End of Daylight Saving Time", 2023, 11, 5) + " - "
    strToday += GetEventDays("Election Day", 2023, 11, 7) + " - "
    strToday += GetEventDays("Veteran's Day", 2023, 11, 11) + " - "
    strToday += GetEventDays("Thanksgiving Day", 2023, 11, 23) + " - "
    strToday += GetEventDays("Winter Solstice", 2023, 12, 21) + " - "
    strToday += GetEventDays("Christmas Day", 2023, 12, 25) + " - "
*/

    return strToday
}