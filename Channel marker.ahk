#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
CoordMode, Mouse, Relative

; NOTE: Put the cursor after the 'O' or 'X' sign!
;  | after here!
;  v
; |O|[???](https://www.youtube...

; CTRL+SHIFT+B : Mark banned
+^b::
Send {Backspace}X^{Right}^+{Left}{Delete}Banned
Return

; CTRL+SHIFT+V : Mark videos deleted
+^v::
Send {Backspace}X^{Right}^+{Left}{Delete}Videos_Deleted
Return

; CTRL+SHIFT+S : Mark strong
+^s::
Send {Backspace}O^{Right}^+{Left}{Delete}Strong
Return

; CTRL+SHIFT+W : Mark weak
+^w::
Send {Backspace}O^{Right}^+{Left}{Delete}Weak
Return

; CTRL+SHIFT+P : Mark piracy
+^p::
Send {Backspace}O^{Right}^+{Left}{Delete}Piracy
Return

; CTRL+SHIFT+ALT+S : Mark strong_videoname
+!^s::
Send {Backspace}O^{Right}^+{Left}{Delete}Strong_VideoName
Return

; CTRL+SHIFT+ALT+M : Mark moderate_videoname
+!^m::
Send {Backspace}O^{Right}^+{Left}{Delete}Moderate_VideoName
Return

; CTRL+SHIFT+Z : Update the changed channel name (the field should be empty and cursor should located at the end of the line)
+^z::
Send {Left 2}^{v}
Return