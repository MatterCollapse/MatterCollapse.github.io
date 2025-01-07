/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from "react";
import Divider from "@/app/components/Layout/Divider";
import Retro_Layout from "@/app/components/Layout/Retro/Retro_Layout";
import Footer from "@/app/components/Layout/Footer";
import { Roboto_Mono } from 'next/font/google'

//store a room int
//pass room int to description and options functions
//description returns text and image block
//options functions return set of buttons


//ascii backgrounds
let bg_house = [
    "                .----. ",
    "    .---------. | == | ",
    "    |.-\"\"\"\"\"-.| |----| ",
    "    ||       || | == | ",
    "    ||       || |----| ",
    "    |'-.....-'| |::::| ",
    "    `\"\")---(\"\"` |___.| ",
    "   /:::::::::::\\\" __ \" ",
    "  /:::=======:::\\`\\`\\  ",
    "  `\"\"\"\"\"\"\"\"\"\"\"\"\"`  '-' "
].join('\n');

let bg_clearing = [
    "MMMMMMMMMMMMMMMMMMMMMMMMWWWMMMWWWWWNNXXNNXK00OOOO0K0OO00KXNNXKKKKKKK000OOOOOOOOO0KKKXXXXXXXXNNNNNNWWWWWNNWWWNNWWNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWMMMMMMMMMMWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWMMMMMMM",
    "MMMMMMMMMMMMMMMMMWWKxkKNXKKOO000XNWNX0OKNNNXX0OOOOOOOOOO0KKKKKKKKKKKK0000OOOOOOO0000000KKKXXXXXNNNNNWWWWNWWWWWWWNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMWWWWWWWWWWWMMMMMMMMMMMMMMMMWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWMMMMMMMM",
    "MMMMMMMMMMMMWX0O0Oxl;:lx0XKOxl::lxKXXkdOXNNNNXK0OOOOOOOOO0KKKKKKKKKKKKKK000000000OOOOOO00KKKXXXXXNNNNNWNWWWWWWWWNNNXNNNNNXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWW",
    "MMMMMMMMMMMN0xlclc:;;,,,:x0Oxxo::coxxooxKXK00KKOOOOOOOOOOO00KKKKKKKKKKKKKKKKKKK000OOOOOOOO00KKKXXXXXNNNNNWWWWNNNNNNNNNNXXXKXXNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWN",
    "MMMMMMMWWWWNXKOoccc:::,'';llok0o;;:ccllodxxxxxxxxkkOOOOOOOOO00KKKKKKKKKKKKKKKKKKK00OOOOOOOOOO00KKXXXXNNNWWWNWNNNNNNNNXXKKKKKXXXXNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWWWWWWWWWMMMMMMMMMMWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMMMMMMMMMMMMMMMMMMMMWWWWWWMMMMMMMMMMMMMMMMMWWW",
    "MMWWWWKKNWWWNXX0xddoolc;;;,,,coc;,;;::ccloodddxxxxxkOOOOOOOOOOO00KKKKKKKKKKKKKKKKK000OOOOOOOOO000KKXXNNNWWWWWWNNNNXXXKKKKKKKKXXNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWWWWWWWWWWWWMMMMMMMMWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNNXNWMMMMMMMMMMMWWWWMMMWWWNXNWWWWMMMMMMMMMMWWWWWWW",
    "WWNNNXOxOKKXWWNNNXKOxdl:::;;;,,,,,,,,;:::cllooddxxxxkkOOOOOOOOOOO000000KKKKKKKKKKKKK000OOOOOOO00000KKXXNNNNNNNNNXXKKKKKXXXXXXXNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWWNNWWWWWWWWMMMMMMMMMWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXXXXNWWWWMMMMMMMMWWWWWWWWNXXXNNNWWMMMMMMMMWWWWWWWW",
    "XNNXXKxdddk0KXNWWWWNXKOdlcc::;;,,,,,,,;;:::cloooddxxxxkOOOOOOOOOOOOOOOOO0KKKKKKKKKKKKKK000O000OOOOO0KKXXXXXXXXXXXXKKXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWNNNNWWWWWMMMMMMMMMWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWXXK0kxOXWWMMMMMMMWWWWWWNXKKKKXXXNNWMMMWWWWWWWWWWWW",
    "0KXXX0kxxdkkxdOKOk0KK0Okdlcc:::;;,,,,,,,;:::ccloodddxxxkkkxxkOOOOOOOOOOOO0KKKKKKKKKKKKKKKK00000OOOOO000KKKKKKKXXNXXXXNNXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWNNNNWWWMMMMMMMMMMMWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMWWWWNKOkxolokXNNNNNWWWWWWWNNNK000KXXXXNWMWWWWWWNWWWWWW",
    "XKO00dodxdl:coxOxccoolllllccccc::::;;;;;::::::ccloooddxxxxxxxkOOOOOOOOOOO00KKKKKKKKKKKKKKKKKK000OOOOOOOO000KKXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWNNNWWWWWMMMMMMMMMMMWWWWNWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWWWNKOOOkxxkkkkkkOKNWWWWWWWWXK00KXXXXNNWWWWWWWWWWWWWW",
    "K0kOklclddocllloolc;',clllclllllccc:::::::::::::cclloodddxxxxkOOOOOOOOOOOOO0000KKKKKKKKKKKKKKKKK00OOOOOOOO00KXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXNNNNNNNNNNNNWWWNNNWWWWWWWMMMMMMMMMMMWWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWWWWWWWWWNKOOOOOO0Okkxxxk0NWWWWWWWWNXK00KXXXXNNWWWWWWWNWWWWW",
    "X0doc'cxxdoc::::::c:;:llllloooooollcc:::::::::::::cclloooddxxkkOkkkkOOOOOOOOOOOOOO0KKKKKKKKKKKKKK000OOOOOO00KKXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNXXKKXXNNNNNNNNNNNNNNNWWWWWWWWWWWMMMMMMMWWWWWWWWWWWWMWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMWWNNNNNNXXXNNNNNWWWWWWWNKKKK0OOOOOOOOkkkkKNWWNNXNNWWNX00KXXXXXXNNWWNNWWNNWWW",
    "kkccc,:xxollllc;,,,:lllllllooooooollccllllcc:::::::::cclloooddxxxxxxkkOOOOOOOOkxdkkk0KKKKKKKKKKK0kkk000OOO000KXXKKXXXXXNNNNNNNNNNNNNNNNNNNNNNXXK000KXXNNNNNNNNNNNNNWWWWWWWWWWWWMMMMMMWWWWWWWWWWWMMMMMWWMMMMMMMMMMMMMMMMMMMMMWNNNXXXXK0KXXXXXXXXNNNNWWNNXXXXX0OOOOOOOOOOOOOKXXK0O0XNNNOk00KXXXXXXXNNWWWWWWWWW",
    ":OOO0xlokkkkxxdddool:,,:cooooooooolccloooolllcc::::::::cccloodddxxxxxxxxkkkxl,'..;cldkk0KKKKKKK0OkO0KK000KKKKXXXKKXXXXXNNNNNNNNNNNNNNNNNNNNXXXKK0000KKKXXNNNNNNNNNNNWWWWWWWWWWWMMMMMMWWWWWWWWWMMWWWWMMMMMMMMMMMMMMMMMMMMMWWNXKKKXXXKOO0KKXXXXXXXXXXKKKKXXXXX0OOOOOOOOOOOOOOOOOOOOO000dlk0KXXXXXXKXNWWNNNWNWW",
    "x00000OkOOkkxddddodo:,'',cooododddoccloooooooollc:::::::::cclooodddddxxxxxxo,.  ..;;':dk00KKKKKKKKKKKK000KKXXXXKKKKKKXXNNNNNNNNNNNXXNNNNNNNXXXXK00000000KKXNXNNNNNXNNNNNWWWWWWWWWWWWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMWXKKKKKKXXXX0kkkOO000KKKKKK0OOOO0KXXKkxxkOOOOOOOOOOOkkkkOOOOOOxcoO0KXXXXXXKKXNNNNNWWW",
    "0000OOOOOOOOkxdddooolc;'':ooddddddolcllloooooollllcc::::::::cccllooooddddddo:'...'...:okOO000000OkkOOOO0KKKK00KKXKKKKXXXXXNNNNNNNNXXXXKKXXNNXXK000000OOOOKXXNNNXX0O0KXNNNNNWWNNNWWWWWWWWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMXOOOO0KXXXKOxxxkOOOOOOOOOOOOOOOOO00kxddxkOOOOOOOkkkxxdxxkkkkkxolx00KXXXXXXKKKKXKKXNN",
    "0000OOOOOOOOkxxxxxxxxxdlcloddddddddolc:looollloollllcc::::::::::ccllooooool:;,...;,.;ldkkO00OOOOkkOOOOO00OOkkO0KXKKKKKKXKKKKXXXNNXX000000KKKK00000000OkkkOOOKXXKOkkkOKNNNNNXXKKXNNXXNWWWWWWWWWWWWWWWWNNXNWMMMMMMMMMMMMMWKOkkO0KXXX0kkxxkkOOOOOOOOOOOOOOOkkxxddddxkOOOOOOkxxddxddddxxdddooO0KXXXXXXKKKKK0O00K",
    "00000OOOOOOOOkkkkkxxxxdddddxxxxddddol::loollccllllllllc:::::::::::ccllooool;'....;::cldkOOOOdoxkOOOkkxxxkxxkkk0KXKKKXKKKOkkkOO0KXXXK000000000000000000OkkkkkkOOkkkkkkOKXXXKK0KXXXKKXWWWWWWWNXNWWWNNNNWNXKKNWWWWMMMMMMMWX0OkO0XXXXKOkkxxkOOOOOOOOOOOOOOOOkdccodoloxkkkkOOOkxxxxxxxxddddddox00KXXXXXXKKKK0OO0K",
    "00000000OOOOOOOOOOkkxddddxkkkkkkkxdddlccccc:::c::cloolc::::::::::::::cclll;'..  .',:cldkkkxo;:xOOOkxdddxxxxxkkOKXKKKK00OOOOOOOOO0KKK00000000000OOOkOkkkkkkkkkkkkkkkkkkO0OOO000K00KXNWWWWWWN0O0XNNXXXNNXKOxk00KXNWMMMMWXXKOOKXXXXXKkxkkkkkkkOOOOOOOOOOOkkxc,;ldolodxxxxxxxxxxkkkkkxxxddddook00KXXXXXXKK0OOO0K",
    "000000000OOOOOOOOOOkxdoodxkkkkkkkkxddl;,,;::;;,.';coooc:::::::::;,,,;::;:c;.    ..':loxxdllldkOkddddddddddddxxxOKKK00OO00000000000000000000000OkkkkkkkkkkkkkkkkkkkkkO0Okkkk00000XNWWWWWWNX0kkkkOO0XXXKKK00kxkO0XNNWNNXXXK0KXXXXXX0kxxkkxkkkkkkkkkkkkkkxo:,,,:odxxddxxkkxxxxkkkkkkkkkxxdddod00KXXXXXXX0OOO0KX",
    "0KKK0000000OOOO0Okoclccloxkkkkkkkkkxxd:'',,'.....':oooc::::::::;'''.',,'''.  .. ..,coddllloxOkdlcldxxxddxdddxxdxxO0OO00000000000000000000000OOkkkkkkkkkkkkkkkkkkkkkkO00Okkk0000XNWWWNNNXKOkkkkkO0KXXXXXXK0kxkO0KXXXXXXXXXXNNXXXXKkxxxkkkkkkkkxxxdddxxdoc::::ldxxxddxkkkkkkkkkkkkkkkkkxxdddok00KXXXXXX0OOO0XN",
    "0KKKK00000000000k;.  .'ldxkkkkkkkOkkkxo,......   .;ooolcc::;;,'..........   .. ...:clllclodxdc:ccclodxxddddxdxxddxxkkOOOO000OOO000000OOOOOOOOOOOOOOkkkkkkkkkkkkkkkkO00000O00000KXXXKKKK0OkkkkO0KXXXXXXXKxlodkO00KXXXXXXXXXNNNNXKOxxkkxxxkkkkxxxddoodddddoooodxkkkxxxkkkkkkkkkkkkkkkkkkxxddodO00KXXXXXK0O0KNN",
    "KKKK000KKKKKKKK0o.    .cdxkOOkOOOOOOkkxc'....,,..':ooolc::,,'''.........    ....',:cclclodxxc',;::ccodxdxxdxddxxkOOOOOOOOOOOOOO0000OOkkkkkkO00000000OkkkkkkOOOkkkkO0000000000000000000OkkkkkO00O0KXKK00Ol,;ldkO0KKXXXNK000XNNNXOdodxxxxkkkkxxxxdddddddddddoooxkkkxxkkkkkkkkkkkkkkkkkkkkxxxdodO00KKKKXXXKKXNN",
    "000KKKKKKKKKKKKKk,     ,oxOOOO0000OOOOkd'.  .;c;;;cool:,,,''''''''.....     ....,;::cclldxxd,.,;,,:clddddddxxxkkO00000000O00000000OOkkkOOkkkkO00OO00OkkkkkkkkOOOO00000000000000000OOOkkkkkkkkxdooxkxddddo;,:ldk00KXXXX0OO0KXNNKxooddxxxxxxxxxxxxddddddddddddodxxoccoxkkkkkkkkkkkkkkkkkkkkkxdox00KK00KXXXXNNN",
    "OOO0KKKKKKKKKKK0kl.    .cxOO0000000OOOOk:.  .....'cool,...   ........      .. .',,;;:clloooc..,,'',::llloxddxkkkOO00000OOO0000000OOOOOO0O0OkkkOOkxkOOOkkkkkkkkO00000000000000OOkkkkkkkkkkkkkkdolollllooooc,,codk00K000OO0KKXNN0kxdddddddddxxkxxxxddddddddddddoodl;,codxkkkkkkkkkkxxkkkxxkkkkddO00KK0KXXXNNNN",
    "OOO000K000O0000Okd:.   .:okO000000000OOOo'   ..  'cool'                    .. .,,,,,;:clccc'..''..';,,:codddddxxkkOOOOOOOO0000000OOO0000000OkkOOkxxxkOOOkkkkkkkO00000000OOOkkkkkkkkkkkkkkkkkkxolooooddooll:';loxO00OOOO0KXXNNX0kkxdddddddddxxxxxxdddddddddddddoolllooodxkkkkxxxxlcoxxxxxxkkkkddO00K0KKXXNNNN",
    "OOOOO0KK00OOOOOOOkd,  .';cdO00000K000O0Ox:.  .'..:lool'                   ....',,,,,;::ccc:.     .';;,;clodddddxxkkkkkkxxkOOOO000OOOOO00O00OOkkOOkkkkkOO0OOOOO0000000000Okkkkkkkxxdddxxxkkkkxdoloddxxxxdool;,:oxkO000OO0XNNNNKOkkkxxdddddddddddddddddddddddddddoddoddddddxxxdoolccodxxxxkxxkxdldO0000KXNNNNN",
    "OOOOOO0K00OOOOOOOkd:...,:cldO0000KK00000Ol.  .'';loooo,                   .. .',,,,,;:::::'       .,;,;cc::ccccodxxxxxxxdxxkkkkkxdddxkOkkOOOOkO00000OOOO00000000000000000kkkkkxdooolooodxkkkxooodxxxxxxxdooc,;cdkO0KK0KKXNNNX0kkkkxddddddddddddddddddddddddddoooddddddddddddddoolooodxxxxxxxxxllk000KXXNNNNN",
    "kkkOOOOkOOOOOOOkxl,.....;lddxO000KKK0000Ox,. .,;:loodd;                   . ...',;;,;::::,.       .,,,;:,'.';::codxddxddddddxxdlccloxkkkkkkkkO00000000000000000000000000Okkkkkkdoolollooddxdoodxxxxxxxxxxdol;,:lxO00KKKXNNNNKOkkkkxdddddddddddddddddddddddddolclodddddoolodddddoooooooooooddoolcoOO00XXNNNNN",
    "dxdxkkdooooollllc'   .. .:dxxxO00KXXK0000Oc. .,;coodxx:                  .. ...';;;;::::;.        .',,;;,'',;::;:loddxxddoccllc;;cdxkkkkkkxxO00000000000000000000000000OOxddxxkxdooooooooddddxkkkkxxxdooooooc,,cdOO0KKKXNNNNK0OkkkxdddddddddddddddddddooooddolccoddollcccoddddddddddooollllllclccxOO0KXNNNNN",
    "colcc:::'..  ..'.     .. .cdxxk0KKXXK0KK00d' .;cloodxxc.                 .  ...,::::::::;.         .',;;;;:::::;;;;:llodd:,;cc:;,;lxkkkkkxdoxO0000000000000000000000OOkkkdlldxkkxxxxdooxxkkkkkkkkkkkxooooooll:,;lxO0KKKXNNNNX0OkxkkxdddddodddddddddddolccclllcccloolcccccodddoodddddddoolllllcldclkO0KXNNNNN",
    ",;;,,'.....  ...       ....cdxxO0KXXKKKKK0k;..,:codxxxc.                .. ...,;ccccccc:,.         ..',;;;,..';:;;;;;;;cc;;:cc;...:dkkkxxolloxxddxkO000OkxkkO000000Okkkkkxdxkkkkkkkkkkxkkkkkkkkkkkkxdoooooolll;,:dkO0KKXXNNNX0Okxxxdocccc:cclooooddddddolccccccccccc::::;;ldoolooddddddoolllccllccdO00XNNNNN",
    "'',,,.....'. ...       ..  .cdxk0KXXXKKKK0Ol..',:oxkkxc.                .  ..,:cccclllc:,.         ...,,,,.  .'.',,,,,,,,,,:cc:. .,ldo::cllldxc..';okkkxlcclodxkOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdoooooodooooc''cxO00KKXNNNXK0Okkkkoc:::::ccccccloddddddolccccccccc:;:;,';llccclllllooolc:,',,':oxO00XNNNNN",
    "..'''.....'.....          ...:oxOKXXXKKKK0Od...':dxkkxc.               ..  .,:cccccccclc'..         ..''''.     .'..'',,...;cc:'. .... .;llloo,..:c:coooccccccloxxxkxkkkkxxxOOOkkkkkkkkkkkkkxxkxxdooooddddddddl..,lk00KKXXNNNK0kxxkkxolllllcccclllooddddddolcccccccc:;,;,,;c:;;;,',;cccc:,.....'lkO00KXXNNNN",
    "...............           .',;:oOKXXXKKKK00x,..'cdxkkxl.               .. ..;:ccccccccl,...         ..'''.     .'.  .....  ':cc,.      .;lllll' .''.,lol:;:cccclllooooooollldxxxkOOOOOOkxxxxxxkkxooodxxxdddddol;..cdO00KKXNNNK0kdddxxddddddolcldddddddddoolcccccccccc;,,,;:;'.',,'',;;:;,,''...,dkO0KXXNNNNN",
    "........ ....              ,loclx0XXXXKKK00k:..':dkkkxl.               ....';cccccccclc. ...        ..'''.    .'.          .;:c;.      .:llll:.  ....,:cc:ccccccccclccccllllll:,;lxkkOkkxxxxxxxkkkxxxxxxddddl;'. .,lxO0KKXNNNX0kxdooodddddddolloodddoollccccccccccccc:...;:,....',,''''''''','.:dxOKXXXNNNNN",
    "  .....    ..              'ldddxOKXXXK0000kc...cxkkkxl'              ...''';::ccllcll;.  ..        ..'''.   ...           .,;::.      'cllll;.  ... ..,;;:cccccccccccclllllll;'';loodxxxxxxkkkkkkOkkkxdooc:'.    .:dO00KKXNNX0Oxolcclloddddolc::::clcccccccccccccccc:'..;;,''..','',;;,......'lxxOKXXNNNNNN",
    "  .....    ..               ':oxxOKXXKK00K0Od'.'lkkkkko,              .'''',;;:coollll,   ..  .    ...'''.  ..              ';::,     .;llllc'.   ..    .',:ccccccccccccllllllc,';cllclodxxkkkxdddxkkxo;...       .;lO000KXNNX00kl:::cccloollc:,'',,:ccccccccccc:,,;:c:,,;,,,,,,''..,;;;'..  .,dxk0XXXNNNNNN",
    "   ....     .                .,cdkKXXKKKK0K0k:.'lkkkkkd;             ..,;;;;;;cooooooc.   .....    ..''''....               .,;:;.    'cllll:.    ..      .';::ccccccccccllllllc;;ll:.'clool:;;,,,''''.           .':d00KKKXNXK0kc.',,,'';::;,'..'''.',;;,,;;::;'  .';:;,..',,,.....,;;,...  .:dxk0XXXNNNNNN",
    "    .. .                       .;oO0KKKKK000Od,'lkkkkkx:.             .';:::;:loooooo;.   .....    .''''''..                .,;::'   .,cllll'   ....       ....,:::cccccccllcccccclc. .clll'  ',..    .      .     .;lk0KKKKXXXK0d;''..   .....   .        ..''..   .,;,'. .....   ..'.....  .lxxO0XXNNNNNNN",
    "       ..                      ..;dO00KKK0000o'.ckkkkkkl.              .';::;:ooooool,     ....    ..''''..                 .,;;:;.  .;clll:.    ...           .,,;,,;;:ccclc:,.;:c:. 'cllc..''.       .            .cdO00OKKXXK0kl,.....                           .,,'.   ...             .,okO0KXXNNNNNNK",
    "      ...     .                 ':oO0000KK0K0x,.:xkkkOko.               .,:::coddddoc.     .....   ...'''.                  .',;::' .,;clll'      ..            ...  ......''...':c;..;clcc;,.         .             ,lxOOxk0KXK0Od;......                          .''.      ..           ..;x00KXXXNNNNNNk",
    "        ..    .                 .;dkO00KKKKK0x'.:kOOOOOd'               .,;::ldxxxxdc.     .....   ..''''.                  .',;;c;'.,:ccl:.       .                             ':;',::c::'.                        .:lkOkxk0KK0Ox:.                               .''.                   .,ck0KXXXNNNNNNNx",
    "    ... ..     .                 .;dkO0KKKKK0o..ckOOOOOx,               .,;;coxxxxxxc.     ..'.    ..''''.                   .,;;:c:,,:clc'        ..                            .;,,;:::;.                           ,coOOkxkKK0Okl.                               .'.                    .,oOKXXXXNNNNNNXo",
    "     ....      .                 .'lxkO0K0KK0l..ckOOOOOx:               .,,;ldxxxkkx;      ..'.    .',,,,.                   .,;;:c:,,:cc;.        ..                            .,,,;;;,.                            .;lxOOkxOKK0Ox;                              .''.                   ..;x0KXKKXNNNNNN0:",
    "      ..                       ..':dxkOOOOOk;  :xOOOOOkc.             ..,,:oxddxkko.      ..'..   .',;;;.                   .',;::;',:c:'         ..                            .,,,;,,'                              'cxO0Oxk0K0Okl.                             .''.                    .cOKXKKKXNNNNNNk;",
    "                               .';:ldxxkkkxl.  .oOOOOOkc.          ...',,;lxxooxkkc.       ....   .,;;;;'                   .',;;;'.,:c:.          .                            .,,,,,,.                              .:dO00kxOKKOOx;                             .'.                     .l0KXK0KXNNNNNXo.",
    "          .                     .,;:ldxddxx;    ;xOOOOko.          ...,;;cdxdoxkOkc.       ....  ..,;;;;'                   .',;,'',;:c;.          .                           .',,,,,.                               .,lkO00kk0KOOko.                           ....                    .'o0XKK0KXNNNNN0:.",
    "        ....    ..             ..,;:cool:cl,    .lOOOOOx;           .';;:oxdodkOOOl.       ....   .,;:;;'                   .';;,',::::'           .                           ',,,,,'.                                .:dO0K00000OOx;                           ....                    .,dKKK00KNNNNNNk'.",
    "          ......               ..',::c:;;;;'..,:;lkOOOOk:           .,::lxxdoxOOOOo.   .   ....   .,;:::,.                  .;::;;:::::.           ...                        .,,,,,,.                                 .,cx0KXK0000OOl.                         ....                     .;x0K00KXNNNNNXo..",
    "                                ..',;,,,'.....':odkkxolo,           .,:ldxxddkOOOOc        ....   .,;::::.                 .':::::::::,            ....                      .,,,,,,.                                   .cdkKXKK0000Ox,                        ....                      .:x0K00KXNNNNN0:..",
    "     ..                        ....'''...     ...'cdc,..'.   .',.  ..':odxkkxkOOOOx;.       .',.   .';::::,.                .,:::::::c;.             ...                     .',,,,;'                                    .:ox0KXKK0000Ol.                       ...                      .'lO000KKXXNNNNk'..",
    "   ......                                       ..:l;,,''.  .;ll:;;::cdxkxkOOOOOOOd,..      .',,.  .',;;;;,.             ....,;:::::::'              ...                    .',,,;::.                                     'cokKXXK0000Ox,         .. ...       ',..                      .;x0000KKXXNNNXo...",
    "  .............                          ..';;,'..',,,;;;,'.':lllcllodxxxxkOOkkOOOo,,'. .   .,;,'...,;;;,',,'..................''',::,............   ....                  .',;;;::.                                      .;lkKXXXKKK000o.    .............   .,,.  ......              .,oOKK0KKXXNNNNKc...",
    "................                     ....,cccc:,..''',;,''',;:llllloolc:ldxkkkkkkxl;,.     ..,;,,,,,,;;;;;;;;;;;,'....'.....',,,'',;;,,''''..''','.........              ..,;;;::;'.                                    ...'cx0XXXXXXK00k:..............'''...,,'...........       .....'lOKKKKKXXXNNNN0c...",
    "...,:od;  ....                    ..,'. .:ccc:,..''',,,.  ..';clllllc::codxxkkkxl:;;,''.   .',,,;;'.',;;,,,,;;;;;,'..,;;,'',;::;,,,'..'',,''''',,,,,,,,''''.    .........',;::::;,'....             .                    ..'cdk0XXXXXXK00d:,''''.''''',,,,,,,,,,,'......'''..........',,;d0KKKKXXXXNNNNO:,,,",
    "...'oKNl....                    .',,'.  .':cc:;,,,,;;;,'..';:clllc:;',:odddxxdl:,,,,;:c,....,;,;;,'',;;,'''',,,,,,,'',;,'',::::::;'....',,,,,,'';:c:;,,,,,,,.........'''.',:;;::;;;;,,'..      ..........   .....         .'cxxOKXXXXXXKOd:,',,,,,,,'',,,,,,,,,,,''''''''''''''..',,,,;;ckKKKKXXXXNNNNNx;,,,",
    ".. .cXW0o:'                  .,;:;..     .;ccc:;;;;;;;;;,,;:::cc;'...,ldddxdl:;;;::clllol:;;:c:;,.',,,,,'''''''..',,,,,,,,:::::::;;,,;;;;,,;:c:;:cc:;;;,,;;;,'''',,,,,'.,;::;;;;;;;;;;;,'...........'............        ..'lkxk0KK0000Odolc:;,,,::::::;;,,,,,,,,'','',,,'',,,,,,,;;;;;;cxKXXXXXXXNNNNXd;:::",
    "::,;lOWNO:.              .....,,;,''....',::::;;;;;,',;;;;;;:clllccccloxOOxc;;;:cclllloddoodxxdc;,;,'.....'''..'',,'''',;:::::;;;;;;;;;;;;;:clc:;;;;;;;;;;;;;;;;,;,,,,,,,;;;;,,;;;;;;::;,'............''''.............  ','oo;;clddldxxxkkxdollcloddolc:;:;;;,'''',,',,,'',,,,,,,,,;:::cxKXXXXXXNNNNNXdokkx",
    ";coxk0WNKkc''.       ....,'...........,;;;;;;;;;;,...,;;;;;;;:loooc:,,;oOkl;;:::clllodxxxddxddoolc:,''....'''';ccc::;;;;;::::;,'',;;;;;;;;;;;;;;;;;;;;;;;:cllllc:;'.';;,'',;,,,;;::::::;,'.'''''',,,,,,;;,'',,,'...',,,.'cc;;;...,clcllodkOkxdddddddxdollloool:;,,'',,,;;,,,,,,,,,,,;:cldOKXXXXXXNNNNNXOkOOx",
    ":;;OWMMMWKkl;'.     ..',:;........'''',;;;;;;;;;;;'.';;;;;,'.',,,,.....'::;;;;:cllcldxxxddoooooollcclc;'.',;;:ccclllccc:;;::;'...',;;;;:::::;;,,,,,,;:::cllllllllc:;::;,'.',;,,;;;;::::;;;;;;;;;;;;;;;;;;;,,,;;;,,,,,;;;cc:,''...,cccldkkkdxdccldo:cddoooddddol:,;:cooodl;,,,,,;;;;::clld0XXXXXXNNNNNNKOO0KK",
    "olkNMWWWWK0d,.      .,::;'........''...;:::c::,',;;:ccc:,..   ';;,......',;;::cllloxkkxdooolllllllldxxdc:;;;;;;;::clcccc:;;,..',,,;:::;:::::::;:cc:;:lllllllllc:::;;::::;,,;;,,;;;;::c::::;;;;;;;;;;;;;;;;;;;;;;;;;;;;:ll:;;'....;clodkkxdloxdooddlodxddddxxddlcloxkOOkxdl;,,,:odddo:cl:cxKXXXXXNNNNNNXKKKXX",
    "WNKXWWWWW0d,.,,...   .......   .   ...;:cclc::;;,',ccc:'.    'cool;'.'';lddc:cllldkOkdcclllllodddddxxdodxdl:;;;:ccccccll;,,,':oooooolc:::::c::cllllllllllllcc::;;,,,;:;;;;;::;:::::::::::::;;;;;;;;;;;;;;;;;;;;,,,,''.'cool:;;'';clodxxxxdddxxxxxxxddddxxxxxxxddkOOOOkxxl:cc:coddl,'.';;;cxKXKKXXNNNNNXXXXXX",
    "XNKXWMWW0:.'lOKx:.     ....        .';;::c:'..,c:,,:c:;;:'.,codddc...';ldkOkxxxxkOOd:,''',,;ldxxxxxxxxdxxxdolc:cloooooollcllcclolloolcccccccccccccccccccccccccc::;;;;;;;;;;:cllcccccccc:;;;:::::;;;;;,,,,,,,,,,,,;::,'.'cddddc;:ccloddxxxdl:lxxxxxxoodxxxxxxkOkkOOOOOkkxc:oxdxxdo:'.',;;;:ok000KXXXNNNNNNNNN",
    "WNNWWMMW0doxKNKd.    ..''....      ....;::;''',:cc:;:;;:::clollol;'.';lxkOO0000OOkxo:,'''',:lodoloddodxxxxxxxdlllloooollllllccccccccccccccccccccccccccccclllllcc:::c::;,,,,,,,'.............',,'...'.........',',:ll:''';okkxlclllodddddxolloxxxxxdlodxxdxxkkOOOOOOOOOOOOkdddooddl:;:::coxkkOOOKKXXXNNNNNNNN",
    "WMMMWWNXKXNNNXKOo:,,:ol,....    ...'. .;:cllc::::c:;;;;;;;:::::::;,;:odkOO0OOOOOdlll:;::;;cllllllllloodxkkxxxxolcccccc::::cc::ccccllllllccccccccc:::::::cccccc:,''''..                                       ..........';lkOOxollldxxdoldxxxxxxddooodxxocoo:lOOO0K0OOOOOkl...;lodollodxOOOOkxdx0XXNNNNNNNNNN",
    "WMMMWX00OXWMMWWWNK0000Oo:,'.......,,,,;::cll:;,,,:cc:::;::::ccc:;;:ldxkOOOkkkOkddddolllc:;:cdoollllloxOOOOkkxdolllccccclloooooolllcc::;'.............'''''.......                                             ..  ...';ccx000kdolodxoc:cdxxxxxxxxddxxxdocc::oO00KK0OOOOOxc'..,cooodxkO0OdldO0kOXNNNNNNNNNNNN",
    "WNNXNXKKXWWWMWWWWWWWNXOdoc;',:;';c:;,;:::cll:,,,;:cccccc:ccloolc::cloooddddddddooolllll;'':dkxdollllokOOkkOOOxxxxxxxxdddddolc::;;,'...              .......                                              .........,:ccoolx000xddoooolcodxddxOOkooxxxoccoxxkOOO000OkOOOOkdc:;'',:oxO000OkxxOXNNNNNNNNXKKXNNNN",
    "WX00KXNNXXNWWWWWWWWNXOxdl;''coloxxxoclodoodoc;;;:c::ccc:;:looolcccccllllodxxxxxdoolllc:;,:okdoloooooodO0000OOkxxxxxxddooolc,......                                      .........''...     ......................':loxxo:lO0kc,,:;,;oxkxddxOOOd''oxxoclxO0OOOOOOOxdxxxkkkxo:',cxO0000OkkO0NNNNNNNNNX0O0XNNNN",
    "NXXXWWMWWWWWMWWMWWN0kkkd,'codxOK0kxxxxddxdddoc::::ccclc,.':ooolcccclllodkkkkxxdoolc:,...'cddoccoxxddxkOOOOOOkkxxxxxddolc:;,..       ...  .....                                   ..','.....''...''''''''..''''',,.;c;;:llok0kl;;'..lOOOOOO000Oo;;lxOOdcdO0OOOO0OOdoddoldkxxodk0K0KKKK00KKXNNNNNNXXNXKKXNNNNN",
    "WMMMMMMMWWWWWWWMWWWNKK0000XXOkOkxxxdooodddodddoolloodoolllooollclllooooxkkkkocllllc:;;,,:lxxdooxOkkOOOOOOOkkkxxddddool:;;,,,''''''',,;,',::::;................         .......  .....''''''''''''',;;;;:;;;,,'..;;dkooddooxOOdoolccdO0OOxxxkkdoc;lxkxdodkOOOOO00Od:clclxOOkOOOO000KKKKXXNXXNNNXXKKXNNNNNNNNN",
    "MMMMMMMMMMMWWWMWWWWWMWNNNWNXOdddxxdlc:ldddlcodxddddddddoc:clollllllooooocldxc,,:llcccccccloooodkOOOkkkkkOOkkkkkxdddddolc:;;,'''',;;;,.',;;::;,,,''''......            ....            .....''',,,,coollooc:;,',lxkO0000OkxkOOkkdcoOOOOOOkxdollc:cdkkdodkOO0000000kc,cdkOOOxc,;:clloddxkO00KKXNXXKKKXNNNNNXXX",
    "MMMMMMMMMMMMMMWWWMMWWWWWWWNKkddxxxxxl:;:lccccoddolloool;,,,:lllllllooooc;;ll;'':lcllccclooc:cccoxkkxxxxxxxxxxxxxxxxxxdddddol;'......     ...........                      ..',,''......'',;:ccc;':cclclxxxdododkOO0000000000000xcokOOOO000OkkOOkOOOO0OOOOxooodkOOOd:ldxkkd,   .,,,,;;:codkkOO0000KKKXXKK0000",
    "MMMMMMMMMMMMMMMWMMNXXNWMMWNkclodxxdoc,.':cloddddolllll:;;,';ccccccccccloooool;''';lolllol:;:ccclodddddddxxxddxxdolcccccccc:,'........     .''.'''''......          .......;cccc;'.','.'',:ldkxocldddxkkkkkkkkOkkkO00000000000OOOOOOOkOOOOOOOOOOOOOO0OOOOxo:,:odxkkxooddo;.    ..':cclooodxxkOOOOOOOOOOkxdxkk",
    "MMMMMMMMMMMMMMMWWWWWWWMWMWWXKX0xl:::,'.'::;cllodlccc:;;:c:,;cccccc:::,,,:lo:,..':looooo:'';:cccllllooddddolddxxdl;;;,,,''',,,,'''.....  ...''.......................,;,,,;:cccc:;,;;;,,,;coxxkxkkkkxdoddxxkkkOOOO000OO00OkkOkkkkkkkkkkkkkOOO00OOOOkkkkOOkkxdxkkkkxxxxo;.    '. .lkOOOkddddxxkkxxOOOOkkxxxkOO",
    "MMMMMMMMMMMMMWNNNWMMMMMMMWWWWNKOd:;:::::c,,:ccccc::c;;cc:,...',,''';cc::cllc,;cloooolllc:ccccclllloooolcccoddxdddolccc;'',,,',,,,'.............. ....''',,,'..  ....,;;,.',;;:::;;;:::,...,::ccll:,........',:odxxxxxxkxddddddxxxkkkkkkOOkkxxOOOkkxdxkkkkkkkkkkkkxdo:.     ,l;,lxOOOOOkdodxkOOkkO0000K0O0000",
    "MWWNWMMMMWNXNWMMMMMMMMMMMMMWWKkdloxxkkxdl;;looollccc:clll;. .....,:loolcclc,.,coooooooooooooolooodddoolcclllloollooddoc;,'...'',,'.....',,:cc:;,'',;cccc:,'..     ..',,,,,,,,,,,'.........''',;::;'..        ...',;;::::::cclcclloddxxxxkdoodkkddxooxkxdooxkkkxo:,.      ..':oxxkOOOOOOkddxO0000KKK00KKKKKKK",
    "WWNNWMMMWWNXNWMMMMMMMMMMMMMMMWX0OOOkdlccl;':oollloooooool;',:cccllooddo:;;;'..;lolllllooooooooodddddddooooooool:;;;:clllc,''',,;:;;;;:clloooooooolcc:,....         ..  ..............',,,'.........             ..,,,,,,;;;:::ccllddolccldkkkkkxddxxkkxoclxkxl'.      .';c::ldxxkkkxxxxxkOO000000000000KKKKK",
    "MWWWMMMMMMMWMMMMMMMMMMMMMMMMMMMMWWKc..':l;',clc::lollllcccloccddddddddddoll:';ccc::::clolllllooooolclllllllcc:;,,,,;:clooc::;;,,''''',,;;;:::::::;,'....      .......             .''....   ......  ......''',,,;:cccccccccloodddoddoolclxkkkkxl:coxxxkxdoxko,....  .,cooooocoxOkxxxxxxdddxxxxxxxxkkO0K0OO0K",
    "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKO00kolcccccc::::,,:cccll:cddddddddooololll::cllolllollllllool:'...',;;::clloolooo:'.......            .....';c::c:,,,,,'''''',,'.    ............'',,,;::::c:;;;cc:;;:cloooooooollcc:::::::cccllodxxkkkkkkxddxxxkkkxl:cddddoooolldxxxxkkkO0K000Okxdoloxxxddddoddxxkkxk0K",
    "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKkkkkdlclllll;;clooodoodddddddoodddddo:;clodxxddxxdooooooo:.         ..,;;:clc:;'.                   .,;,:cclc;'....',,,,''''............ ...;clllcc::;,,''.... ..',,,,;cllllcccc::::ccclloodddddoodxxdxxkxxkkxkxl:;:oxkkkxxkkkkkkkOOOOOOOOOO0OOOkkkxkOOOkkkkkkkOO0KK",
    "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXOkkkxocldxxxdlllodxkkxddddddddddddddol::ooooxkkkkkkxdoooooo:.               ...;od:..           ..',codc;'..        .',,,,,,,,,'.....        .;cllllllllc;....         .:cccc:cccldddddddddddddolcldxlcoxkkxkkxxkxdodxxkkxxkxkkkkOOOOOOOOOOOOOOOOd::coOKKKKKKKKKKKKKK",
].join('\n');

let map: Room[] = [{
    image_ascii: bg_clearing,
    ascii_size: 4,
    description: "This is room 0",
    id: 0,
    options: ['Go to room 1', 'Enter room 2'],
    option_links: [1, 2]
},{
    image_ascii: bg_house,
    ascii_size: 16,
    description: "This is room 1",
    id: 1,
    options: ['Go to room 0'],
    option_links: [0]
},{
    image_ascii: bg_house,
    ascii_size: 16,
    description: "You're in room 2",
    id: 2,
    options: ['Go to room 0'],
    option_links: [0]
}
]
const font_courier = Roboto_Mono({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

interface Room {
    image_ascii: string; //ascii art of background as a formated string
    ascii_size: number;
    description: string;
    id: number; //number of this room, replace later with array index
    options: string[];
    option_links: number[]; //what room the corresponding options sends you to
}

function description(room: number) {

    return(
        <div>
            <pre className={"flex flex-col items-center " + font_courier.className} style={{fontSize: map[room].ascii_size, lineHeight: '110%'}}>
                {map[room].image_ascii}
            </pre>
            <div style={{textAlign: 'center', margin: 10}}>
                {map[room].description}
            </div>
        </div>
    );
}

function options(room: number, setCurrentRoom: (arg0: number) => void) {
    let count = map[room].options.length

    return(
        Array.from({length: count},(_,index) => 
            <button 
                key={index} 
                onClick={(e) => setCurrentRoom(map[room].option_links[index])}
                className="text-retro"
            >
                &#62; {map[room].options[index]}
            </button>
        )
    );
}

export default function TextGame() {
    const [currentRoom, setCurrentRoom] = useState(0);
    
    return (
    <Retro_Layout>
        <div>
            {description(currentRoom)}
        </div>
        <Divider/>
        <div className="flex h-full flex-col">
            {options(currentRoom, setCurrentRoom)}
        </div>
        <Footer />
    </Retro_Layout>
    );
}
