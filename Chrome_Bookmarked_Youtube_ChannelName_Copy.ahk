#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
; CoordMode, Mouse, Relative
CoordMode, Mouse, Screen

; Print the current cursor pos
*^c::
Send {F2}^{a}{Right}{Left 10}+{Home}^{c}{Escape}
Return

;*f::
;Send {Left}{Backspace}{Enter}
;Return
