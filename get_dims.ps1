Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('e:\Project_House\Dev_area\src\assets\floorplan\floor_2\Floor_2.png')
Write-Host "Width:" $img.Width
Write-Host "Height:" $img.Height
$img.Dispose()
