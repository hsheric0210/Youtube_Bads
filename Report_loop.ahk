#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
CoordMode, Mouse, Relative

; Report loop for all tabs
c::
While GetKeyState("c", P)
{
	Send !{R}
	Sleep 100
	Send ^{Tab}
	Sleep 250
}
Return
