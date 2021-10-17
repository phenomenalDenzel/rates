package com.qds.rates.service.dto;

import java.util.ArrayList;
import java.util.List;

public class FilterOptionDTO {
    String key;
    List<String> selectedValues = new ArrayList<>();

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public List<String> getSelectedValues() {
        return selectedValues;
    }

    public void setSelectedValues(List<String> selectedValues) {
        this.selectedValues = selectedValues;
    }
}
