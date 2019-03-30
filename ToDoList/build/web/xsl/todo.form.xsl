<?xml version="1.0" encoding="UTF-8"?>

<!--
    Document   : todo.form.xsl
    Created on : March 27, 2019, 3:27 AM
    Author     : admin
    Description:
        Purpose of transformation follows.
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html"/>

    <xsl:template match="/">
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2" for="title">Title *:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="txtTitle" placeholder="Enter Title" value="{todo/title}"/>
                    <span class="text-danger hidden" id="errorRequireTitle">Title is required</span>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="description">Description:</label>
                <div class="col-sm-10"> 
                  <input type="text" class="form-control" id="txtDescription" placeholder="Enter Description" value="{todo/description}"/>
                </div>
            </div>
            <div class="form-group"> 
                <div class="col-sm-offset-2 col-sm-10">
                  <div class="checkbox">
                    <label>
                        <xsl:choose>
                            <xsl:when test="todo/done = 'true'">
                                <input type="checkbox" id="cbIsDone" checked="true"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <input type="checkbox" id="cbIsDone"/>
                            </xsl:otherwise>
                        </xsl:choose>
                        Done
                    </label>
                  </div>
                </div>
            </div>
            <div class="form-group"> 
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="button" class="btn btn-default" id="btnSubmit">Submit</button>
                </div>
            </div>
        </form>
    </xsl:template>

</xsl:stylesheet>
