package com.ssafy.ssuk.utils.image;

import lombok.Data;

@Data
public class ImageInfo {
    private String imageName;
    private String imageUrl;

    public ImageInfo(String imageName, String imageUrl) {
        this.imageName = imageName;
        this.imageUrl = imageUrl;
    }
}
