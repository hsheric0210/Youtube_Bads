// ==UserScript==
// @name         Youtube bot reporter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Report specific user as video spammer
// @author       You
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @run-at         document-end
// @include        http://*
// @include        https://*
// ==/UserScript==

AddChannelReportButton();
AddVideoReportButton();

function AddChannelReportButton()
{
    if (!/.*youtube.com\/(channel|c)\/.*/.test(window.location.href))
    {
        return
    }

    if (Boolean(document.querySelector("#action-buttons")))
    {
        var divNode = document.createElement('div');
        divNode.innerHTML = '<button id="ReportThisChannelAsVideoSpam" type="button">Report as video spammer</button>';
        divNode.setAttribute('id', 'autoReportContainer01');
        document.querySelector("#action-buttons").appendChild(divNode);
        document.getElementById("ReportThisChannelAsVideoSpam").addEventListener("click", OnReportChannelAsVideoSpamClick, false);
    }
    else
    {
        window.setTimeout(AddChannelReportButton, 50);
    }
}

function AddVideoReportButton()
{
    if (!/.*youtube.com\/watch\?v=.*/.test(window.location.href))
    {
        return
    }

    if (Boolean(document.querySelector("div#info > div#menu-container > div#menu > ytd-menu-renderer")))
    {
        var divNode = document.createElement('div');
        divNode.innerHTML = '<button id="ReportAsVideoSpam" type="button">Report as video spam</button>';
        divNode.setAttribute('id', 'autoReportContainer01');
        document.querySelector("div#info > div#menu-container > div#menu > ytd-menu-renderer").appendChild(divNode);
        document.getElementById("ReportAsVideoSpam").addEventListener("click", VideoReport_ClickMoreButton, false);
    }
    else
    {
        window.setTimeout(AddVideoReportButton, 50);
    }
}

//--- Style our newly added elements using CSS.
GM_addStyle(`
    #autoReportContainer01 {
        position: relative;
        text-align: start;
        top: 0;
        left: 0;
        font-size: 20px;
        margin: 5px;
        opacity: 0.9;
        z-index: 1100;
        padding: 5px 20px;
    }
    #ReportAsVideoSpam {
        cursor: pointer;
    }
`);

function OnReportChannelAsVideoSpamClick()
{
    document.querySelector('#button[aria-label="사용자 신고"]').click();
    ReportUser_ClickReportUserButton();
}

function ReportUser_ClickReportUserButton()
{
    if (!document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-iron-dropdown[aria-hidden=true]'))
    {
        document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item").click();
        ReportUser_ClickSpamCheckbox();
    }
    else
    {
        window.setTimeout(ReportUser_ClickReportUserButton, 20);
    }
}

function ReportUser_ClickSpamCheckbox()
{
    if (Boolean(document.querySelector('#yt-options-renderer-options > tp-yt-paper-radio-button[aria-label^="스팸"]')) && !(document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog > ytd-multi-page-menu-renderer[menu-style*="type-report-channel"]')?.parentElement?.hasAttribute('aria-hidden') ?? true))
    {
        document.querySelector('#yt-options-renderer-options > tp-yt-paper-radio-button[aria-label^="스팸"]').click();
        ReportUser_ClickNext(ReportUser_CheckAllVideos);
    }
    else
    {
        window.setTimeout(ReportUser_ClickSpamCheckbox, 20);
    }
}

function ReportUser_CheckAllVideos()
{
    if (!!document.querySelector("#selectable-videos"))
    {
        document.querySelectorAll("#selectable-videos > ytd-selectable-video-renderer > tp-yt-paper-checkbox").forEach(t => t.click());
        ReportUser_ClickNext(ReportUser_EnterDetailedReason);
    }
    else
    {
        window.setTimeout(ReportUser_CheckAllVideos, 20);
    }
}

function ReportUser_EnterDetailedReason()
{
    var element = document.querySelector('textarea#textarea[style-target="textarea"]');
    if (Boolean(element))
    {
        element.value = `* Video Spam
    - Massively uploading same content.
* Incentivization Spam
    - Videos where the purpose is to encourage viewers to subscribe
* Misleading Metadata or Thumbnails
    - Using the title, thumbnails, or description to trick users into believing the content is something it is not.`;
        ReportUser_ClickNext(null)
    }
    else
    {
        window.setTimeout(ReportUser_EnterDetailedReason, 20);
    }
}

function ReportUser_ClickNext(callback)
{
    if (document.querySelector("#next-button").hasAttribute('disabled'))
    {
        window.setTimeout(ReportUser_ClickNext, 20, callback);
        return;
    }

    document.querySelector("#next-button > a > #button").click();
    if (Boolean(callback))
    {
        window.setTimeout(callback, 20);
    }
}

function VideoReport_ClickNext(callback)
{
    if (document.querySelector("#submit-button").hasAttribute('disabled'))
    {
        window.setTimeout(VideoReport_ClickNext, 20, callback);
        return;
    }

    document.querySelector("#submit-button > a > #button").click();
    if (Boolean(callback))
    {
        window.setTimeout(callback, 20);
    }
}


function VideoReport_ClickSubmit()
{
    if (document.querySelector("#submit-button").hasAttribute('disabled'))
    {
        window.setTimeout(VideoReport_ClickNext, 20);
        return;
    }

    document.querySelector("#submit-button > yt-button-renderer > a > #button").click();
}

function VideoReport_ClickMoreButton()
{
    var element = document.querySelector('#menu > ytd-menu-renderer > yt-icon-button > button[aria-label="추가 작업"]');
    if (Boolean(element))
    {
        element.click();
        window.setTimeout(VideoReport_ClickReportVideoButton, 20);
    }
    else
    {
        window.setTimeout(VideoReport_ClickMoreButton, 20);
    }
}

function VideoReport_ClickReportVideoButton()
{
    if (Boolean(document.querySelector('#items')))
    {
        document.querySelector('#items > ytd-menu-service-item-renderer > tp-yt-paper-item:nth-child(1)').click();
        window.setTimeout(VideoReport_ClickSpamCheckbox, 20);
    }
    else
    {
        window.setTimeout(VideoReport_ClickReportVideoButton, 20);
    }
}

function VideoReport_ClickSpamCheckbox()
{
    console.info('VideoReport_ClickSpamCheckbox');
    if (Boolean(document.querySelector('#options-select > tp-yt-paper-radio-group')))
    {
        var element = document.querySelector('#options-select > tp-yt-paper-radio-group > tp-yt-paper-radio-button[aria-label^="스팸"]');
        element.click();
        window.setTimeout(VideoReport_ClickVideoSpamCheckbox1, 20);
    }
    else
    {
        window.setTimeout(VideoReport_ClickSpamCheckbox, 20);
    }
}

function VideoReport_ClickVideoSpamCheckbox1()
{
    console.info('VideoReport_ClickVideoSpamCheckbox1');
    if (Boolean(document.querySelector('#options-select > tp-yt-paper-radio-group > tp-yt-paper-dropdown-menu')))
    {
        document.querySelectorAll('#options-select > tp-yt-paper-radio-group > tp-yt-paper-dropdown-menu')[5].click();
        window.setTimeout(VideoReport_ClickVideoSpamCheckbox2, 20);
    }
    else
    {
        window.setTimeout(VideoReport_ClickVideoSpamCheckbox1, 20);
    }
}

function VideoReport_ClickVideoSpamCheckbox2()
{
    console.info('VideoReport_ClickVideoSpamCheckbox2');
    var found = false;
    document.querySelectorAll('tp-yt-paper-item').forEach(element => {
        if (element.textContent.includes('대량 광고'))
        {
            element.click();
            found = true
        }
    });
    if (found)
    {
        VideoReport_ClickNext(VideoReport_WriteDetails);
        // goto next
    }
    else
    {
        window.setTimeout(VideoReport_ClickVideoSpamCheckbox2, 20);
    }
}

function VideoReport_WriteDetails()
{
    var element = document.querySelector('#description-text > div > textarea#textarea');
    if (Boolean(element))
    {
        element.value = `* Video Spam
- Massively uploading same content.`;
        VideoReport_ClickSubmit();
    }
    else
    {
        window.setTimeout(VideoReport_ClickMoreButton, 20);
    }
}
