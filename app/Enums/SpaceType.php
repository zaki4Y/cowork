<?php

namespace App\Enums;

enum SpaceType: string
{
    case HotDesk = 'hot_desk';
    case PrivateOffice = 'private_office';
    case MeetingRoom = 'meeting_room';
    case VirtualOffice = 'virtual_office';
}
