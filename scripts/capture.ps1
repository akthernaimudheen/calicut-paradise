$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "C:\Users\akthe\.gemini\antigravity\brain\afab0ff6-1460-4e1e-9c73-7b310caba5a9"

$targets = @(
    @{ Name = "mobile_full.png"; Args = "--headless --disable-gpu --window-size=390,3800 --screenshot=$outDir\mobile_full.png http://127.0.0.1:3000" },
    @{ Name = "desktop_hero_clean_1440.png"; Args = "--headless --disable-gpu --window-size=1440,900 --screenshot=$outDir\desktop_hero_clean_1440.png http://127.0.0.1:3000" }
)

foreach ($t in $targets) {
    Start-Process -FilePath $chrome -ArgumentList $t.Args -Wait
}

Get-ChildItem -Path $outDir -Filter "mobile_full.png" | Select-Object Name, Length, LastWriteTime
