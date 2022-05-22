#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
CoordMode, Mouse, Relative

; TODO: Automate with CEF and JavaScript

SetKeyDelay, 500, 10

RepeatUp(count) {
    Loop %count%
    {
        Send {Up}
        Sleep 40
    }
}

RepeatDown(count) {
    Loop %count%
    {
        Send {Down}
        Sleep 40
    }
}

OpenChannelReport() {
    ; Select the 'Report this user' option and click; then wait for menu
    ; MouseClick, Left, 1387, 662
    Send {Tab}{Up}
    Sleep 50
    Send {Space}
    Sleep, 1000

    ; Select 'Spam or Scam' checkbox and wait for 'Next' button
	MouseClick, Left, 775, 650
    ; Send {Up 2}
    Sleep, 100

    ; Click 'Next' button and wait for video list
    ; MouseClick, Left, 1145, 840
    Send {Tab}{Space}
    Sleep, 1000

    ; Select the first video
    ; MouseClick, Left, 776, 401
    Send {Tab 2}{Space}
}

OpenReportMenu() {
    ; Click '...' button and wait
    MouseClick, Left, 1365, 995
    Sleep, 400

    ; Select 'Report' item and click; then wait
    ; MouseClick, Left, 1427, 912
    Send {Tab}{Space}
    Sleep, 600
}

SelectSpam() {
    ; Select 'Spam or misleading content'
    RepeatUp(3)
    Send {Tab}{Space}
    Sleep, 600
}

SubmitVideoReport() {
    ; Then click 'next' and wait
    Send {Tab 4}{Space}
    ; MouseClick, Left, 775, 625
    Sleep, 800

    ; Specify timestamp 0:00
    Send ^{a}{0}{Tab}^{a}{0 2}{Tab}^{v}
    Sleep, 200

    ; Click 'Report' button
    Send {Tab 3}{Space}
    ; MouseClick, Left, 852, 638
    Sleep, 1500

    ; Close the report summonary
    Send {Tab}{Space}
}

; 1: Open spam report (no channel art)
*1::
    ; Click the flag button and wait for drop-down menu
    MouseClick, Left, 1340, 502
    Sleep, 400
    OpenChannelReport()
Return

; 2: Open spam report (channel art)
*2::
    MouseClick, Left, 1340, 780
    Sleep, 400
    OpenChannelReport()
Return

; Check all checkboxes
*3::
    Loop
    {
        GetKeyState, state, 3, P
        if state = U
            break

        Send {Tab 2}{Space}
        Sleep, 40
    }
Return

; Check single checkbox
*4::
Send {Tab 2}{Space}
Return

; Paste reason and submit report
*5::
    ; Click the 'Next' button and wait
    MouseClick, Left, 1145, 840
    Sleep, 1000

    ; Paste the reason and wait
    Send ^{V}
    Sleep, 100

    ; Click the 'Submit' button
    Send {Tab 2}
    Send {Space}
    ; MouseClick, Left, 1145, 840
    Sleep, 800

    ; Close the result screen
    Send {Tab}{Space}
Return

; Open report for a video - Misleading Text - With Scripts
*6::
    OpenReportMenu()
    SelectSpam()

    ; Select 'Misleading Text'
    RepeatDown(3)
    Send {Space}
    Sleep, 600

    SubmitVideoReport()
Return

; Open report for a video - Massive Spam - With Scripts
*7::
    OpenReportMenu()
    SelectSpam()

    ; Select 'Massive Ad.'
    Send {Down}
    Sleep, 30
    Send {Space}
    Sleep, 600

    SubmitVideoReport()
Return
