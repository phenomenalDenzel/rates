package com.qds.rates.service.dto;

public class BVNCheckResponse {

    private boolean bvnExists;

    public boolean isBvnExists() {
        return bvnExists;
    }

    public BVNCheckResponse setBvnExists(final boolean bvnExists) {
        this.bvnExists = bvnExists;
        return this;
    }
}
