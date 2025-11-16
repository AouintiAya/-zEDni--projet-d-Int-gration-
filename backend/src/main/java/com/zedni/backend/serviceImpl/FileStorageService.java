package com.zedni.backend.serviceImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;


@Service
public class FileStorageService {

    private final Path root = Paths.get("uploads");

    public FileStorageService() throws IOException {
        if (!Files.exists(root)) Files.createDirectories(root);
    }

    public String store(MultipartFile file) throws IOException {
        String ext = getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID().toString() + (ext.isEmpty() ? "" : "." + ext);
        Path target = root.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        // retourne chemin relatif (ou URL si tu exposes via static resources)
        return "/uploads/" + filename;
    }

    public void delete(String urlPath) throws IOException {
        // urlPath = "/uploads/xxxx"
        if (urlPath == null) return;
        String filename = Paths.get(urlPath).getFileName().toString();
        Path target = root.resolve(filename);
        Files.deleteIfExists(target);
    }

    private String getExtension(String name) {
        if (name == null) return "";
        int i = name.lastIndexOf('.');
        return i >= 0 ? name.substring(i+1) : "";
    }
}
