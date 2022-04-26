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
- macOS Big Sur 11.6.5
- macOS Monterey 12.0<br>(`AirportItlwm.kext` and `IntelBluetoothInjector.kext` need to be replaced on your own.)
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
| HDMI | Not tested | Not tested, but there is a high probability of not working. |
<br>

## Recommened BIOS settings / modifications
> Without these settings / modifications, your device may be unstable even become unbootable.

- `Secure Boot: OFF`
- `SATA mode: AHCI`
  - Boot into BIOS and switch to Main tab.
  - Press `Ctrl + S`, then the hidden item will show up.
  - Toggle the option.
- `CFG Lock: OFF`
  - This is a hidden item in BIOS, so we need to change its corresponding value by **H2OUVE**.
  - Follow the instruction below.
  - Run `WDFInst.exe` as administrator, then run `H2OUVE-W-GUIx64.exe`.
  - Click on `File` -> `Load runtime` -> `Variable`, then locate to `0x43` in CpuSetup.
  - Change the default value from `0x1`(Enabled) to `0x0`(Disabled).
- `Low Power S0 Idle Capability: OFF`
  - This is item MUST be off to enable S3 sleep functionality.
  - This is a hidden item in BIOS, so we need to change its corresponding value by **H2OUVE**.
  - Follow the instruction below.
  - Run `WDFInst.exe` as administrator, then run `H2OUVE-W-GUIx64.exe`.
  Click on `File` -> `Load runtime` -> `Variable`, then locate to `0x28` in Setup.
  - Change the default value from `0x1`(Enabled) to `0x0`(Disabled).
<br>

## Screen shots
<br>

## Reference
- <https://zhuanlan.zhihu.com/p/266400995>
- <https://blog.csdn.net/weixin_42525211/article/details/112126322>
- <https://github.com/m0d16l14n1/icelake-hackintosh>
- <https://github.com/KatLantyss/Acer-Swift-IceLake-Hackintosh-OpenCore>
<br>

## Credits
- [**Apple**](https://www.apple.com/tw/) for the macOS.
- [**Acidanthera**](https://github.com/acidanthera) for awesome kexts and first-class support for hackintosh enthusiasts.
- [**Dortania**](https://github.com/dortania) for the great guides.
- [**KatLantyss**](https://github.com/KatLantyss) for fixing bugs in Acer Swift Laptop.
