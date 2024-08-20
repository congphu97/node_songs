export interface IAudio {
    "type": string,
    "title": string,
    "id": string,
    "url": string,
    "bestThumbnail": {
        "url": string,
        "height": number
    },
    "thumbnails": [
        {
            "url": string,
            "width": number,
            "height": number
        },
        {
            "url": string,
            "width": number,
            "height": number
        }
    ],
    "isUpcoming": false,
    "upcoming": null,
    "isLive": false,
    "badges": [
        "New"
    ],
    "author": {
        "name": string,
        "channelID": string,
        "url": string,
        "bestAvatar": {
            "url": string,
            "width": number,
            "height": number
        },
        "avatars": [
            {
                "url": string,
                "width": number,
                "height": number
            }
        ],
        "ownerBadges": string[],
        "verified": true
    },
    "description": null,
    "views": number,
    "duration": string,
    "uploadedAt": string,
}
