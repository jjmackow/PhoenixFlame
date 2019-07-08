<?php

/**
 * @file
 * Default template for XSL stylesheet body.
 */
?>
<xsl:element name="h2">
  <xsl:attribute name="href">
    <xsl:value-of select="channel/link" />
  </xsl:attribute>
  <xsl:value-of select="channel/title" />
</xsl:element>
<xsl:element name="p">
  <xsl:value-of select="channel/description" />
</xsl:element>

<?php if ($variables['rss_message']): ?>
  <?php print $variables['rss_message']; ?>
<?php endif; ?>

<dl style="padding-right:1em">
  <xsl:for-each select="channel/item">
    <dt>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:value-of select="link"/>
        </xsl:attribute>
        <xsl:value-of select="title"/>
      </xsl:element>
    </dt>
    <dd
      <xsl:value-of select="description" />
      <br />
      <span class="comments">
        <xsl:value-of select="pubDate" />
      </span>
    </dd>
  </xsl:for-each>
</dl>
