#!/usr/bin/env python3
"""Download Laura Mateo portfolio assets from Readymag CDN."""

import json
import os
import urllib.request
import http.cookiejar

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Referer": "https://readymag.website/u3033500018/4596352/",
    "Accept": "*/*",
}

ASSETS = {
    "work/cupra/hero.mp4": "https://vb-p.rmcdn1.net/644a3f4141a23500147eb2d4/65b28693aaf399007611aa9f/4f8c334c-fe0d-4ad3-9707-e1e45034e3f7.mp4",
    "work/cupra/hero-poster.jpg": "https://vb-p.rmcdn1.net/644a3f4141a23500147eb2d4/65b28693aaf399007611aa9f/4f8c334c-fe0d-4ad3-9707-e1e45034e3f7.jpg",
    "work/cupra/configurator-1.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-7dc05e6b-397d-43ea-85e8-10d5610f76cd.png",
    "work/cupra/configurator-2.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-607ecd71-3618-4a3e-ae4c-705f060fe663.png",
    "work/cupra/configurator-wide.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-3d6702f7-804b-4b35-9e20-f543950a2413.png",
    "work/cupra/studies-1.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-8407a38e-ec77-4784-96e3-a8795f11f5f7.png",
    "work/cupra/studies-2.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-64c416d5-4954-448c-8b36-9654d143a864.png",
    "work/cupra/studies-3.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-063b32ce-1bed-47fe-b475-6da23bc3e137.png",
    "work/correos/hero.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-9d97277a-2022-481a-bc44-129dbdd966c8.png",
    "work/correos/detail-1.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-2a2584c8-d3c3-4364-b367-ff47a1c8778a.png",
    "work/correos/detail-2.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-4b44851a-a89a-43dc-b581-a8ce8214fcbc.png",
    "work/orange/dls-1.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-45ddc19b-fc1e-4cf7-805a-0884f9dda6a9.png",
    "work/orange/dls-2.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-2d608272-3190-46e6-8bee-ac24aa2144bc.png",
    "work/orange/dls-3.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-8e31a091-d15e-48a1-867b-98b2471f18c9.png",
    "work/hyperloop/plan.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-9b0221d9-81c4-497c-b777-da105e85c45c.png",
    "work/hyperloop/render.jpg": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-f3dfe807-9614-4f67-a08b-e2d3da27a21b.jpg",
    "work/hyperloop/detail-1.jpg": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-5a6a40e9-6d20-477e-8ecf-025b46986e4e.jpg",
    "work/hyperloop/detail-2.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-dc5f8354-75ac-41db-8f6e-cfb13322945b.png",
    "work/hyperloop/detail-3.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-44d6a85d-055e-4b6e-a976-4ba7949cbcf5.png",
    "work/recrem/hero.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-c27235b8-ab3d-4dcf-b918-9390c670fd18.png",
    "work/recrem/detail-1.jpg": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-235dc797-f761-4954-89f9-fe15e888e0aa.jpg",
    "work/recrem/detail-2.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-957b3f76-12dc-4aaa-a9be-d7da06fbd2c5.png",
    "work/recrem/detail-3.jpg": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-67985c94-bf7a-4670-bdea-2dbde40ede7b.jpg",
    "work/recrem/detail-4.png": "https://i-p.rmcdn.net/644a3f4141a23500147eb2d4/4596352/image-b80aaade-fec0-45b6-b214-af3b9edcf4f7.png",
}


def authorize(opener):
    body = json.dumps({"pass": "password", "num_id": 4596352}).encode()
    req = urllib.request.Request(
        "https://readymag.website/api/readymag/authorize",
        data=body,
        headers={
            **HEADERS,
            "Content-Type": "application/json",
            "Origin": "https://readymag.website",
            "x-rm-version": "0b1d515c",
        },
        method="POST",
    )
    opener.open(req, timeout=30).read()


def download(opener, rel_path, url):
    dest = os.path.join(PUBLIC, rel_path)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        print(f"skip {rel_path}")
        return
    req = urllib.request.Request(url, headers=HEADERS)
    data = opener.open(req, timeout=120).read()
    with open(dest, "wb") as f:
        f.write(data)
    print(f"saved {rel_path} ({len(data)} bytes)")


def main():
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    authorize(opener)
    for rel, url in ASSETS.items():
        try:
            download(opener, rel, url)
        except Exception as e:
            print(f"FAIL {rel}: {e}")


if __name__ == "__main__":
    main()
