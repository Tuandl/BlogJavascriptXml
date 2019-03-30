<?xml version="1.0" encoding="UTF-8"?>

<!--
    Document   : todo.table.xsl
    Created on : March 27, 2019, 3:31 AM
    Author     : admin
    Description:
        Purpose of transformation follows.
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html"/>

    <!-- TODO customize transformation rules 
         syntax recommendation http://www.w3.org/TR/xslt 
    -->
    <xsl:template match="/">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="todos/todo">
                    <tr>
                        <td><xsl:number value="position()" format="1"/></td>
                        <td><xsl:value-of select="title"/></td>
                        <td><xsl:value-of select="description"/></td>
                        <td><xsl:value-of select="createdAtString"/></td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="done = 'true'">
                                    <xsl:text>Done</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:text>Pending</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td>
                            <button class="btn btn-primary" name="btnEdit" 
                                    data-id="{id}">Edit</button>
                            <button class="btn btn-warning" name="btnDelete"
                                    data-id="{id}">Delete</button>
                        </td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

</xsl:stylesheet>
