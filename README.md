# ACER-SF314-57G-55UK-HACKINTOSH

## Preliminary
Hello visitors! This is a repository of building Hackintosh on Acer SF-314-57G-55UK. If your model is same or similar(mainly Acer Swift series of icelake platform) to mine, it's welcome for you to grab a copy of my EFI and make some modification to fit it into your device. Please remember to replace the SMBIOS inside config.plist with ones of your own.<br>Enjoy~
<br>
<br>

## Disclaimer
**I AM NOT RESPONSIBLE FOR BRICKED DEVICES. DON'T BLAME ON ME FOR ANY MALFUNCTION.**<br>**REMEBER TO BACK UP EVERYTHING BEFORE APPLYING ANY MODIFICATION ONTO YOUR DEVICE.**<br>**SOME MODIFICATION MAY COMPROMISE YOUR HARDWARE / SOFTWARE, PLEASE BE AWARE OF WHAT YOU ARE DOING.**
<br>
<br>

## Specifications
| Component | Details |
|:---:|:---:|
| Model | Acer SF314-57G-55UK |
| CPU | Intel Core i5-1035G1 |
| RAM | 8GB LPDDR4X 2666Mhz |
| SSD | WD SN520 512GB |
| Graphic Cards | Intel IceLake UHD Graphics 32EU<br>Nvidia GeForce MX350 |
| WiFi / BT | Intel Wireless AX201 CNVi |
| BIOS Version | 1.18 |
<br>

## Supported Versions
- macOS Big Sur
- macOS Monterey (itlwm needs to be replaced on your own.)
<br>

## Known issues
Most parts are working correctly, except the following.

| Component | Status | Description |
|:---|:---|:---|
| AirDrop | Not working | Not compatible with intel WiFi / BT adapters. |
| Nvidia GeForce MX350 | Not working | Not suppoerted by macOS. |
| FingerPrint | Not working | Not suppoerted by macOS. |
| Internal Mic | Not working | There is temporarily no solution for this, same as 聯想小新13. |
| Thunderbolt 3 | Partial working | This is not fully tested because I have no TB3 devices by my side. <br>However, it's known that if not rebooting from windows, system will crash when connecting external display through TB3 port. |
| HDMI | Not tested | Not tested, but there is a high probability of not work. |
<br>

## Recommened BIOS settings / modifications
Without these settings / modifications, your device may be unstable even become unbootable.
- `Secure Boot: OFF`
- `SATA mode: AHCI`
// Press `Ctrl + S` in BIOS to show hidden menu.

- `CFG Lock: OFF`
- `S0 Idle: OFF`
<br>

## Screen shots
<br>

## References
<br>

## Credits
- [**Apple**](https://www.apple.com/tw/) for the macOS.
- [**Acidanthera**](https://github.com/acidanthera) for awesome kexts and first-class support for hackintosh enthusiasts.
- [**Dortania**](https://github.com/dortania) for the great guides.
- [**KatLantyss**](https://github.com/KatLantyss) for fixing bugs in Acer Swift Laptop.
