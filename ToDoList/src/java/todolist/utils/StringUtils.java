/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todolist.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 *
 * @author admin
 */
public class StringUtils {
    
    
    public static Integer parseStringToInt(String in) {
        Integer result = null;
        
        try {
            result = Integer.parseInt(in);
        } catch (Exception e) {
            //cannot parse;
        }
        
        return result;
    }
    
    public static String readStringFromInputStream(InputStream is) {
        StringBuilder builder = new StringBuilder();
        
        try {
            InputStreamReader isReader = new InputStreamReader(is, "UTF-8");
            BufferedReader bufferedReader = new BufferedReader(isReader);
            String line = null;
        
            while((line = bufferedReader.readLine()) != null) {
                builder.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        String result = builder.toString();
        return result;
    }
}
