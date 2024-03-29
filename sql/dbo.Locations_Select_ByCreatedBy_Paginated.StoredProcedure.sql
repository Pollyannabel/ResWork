USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Select_ByCreatedBy_Paginated]    Script Date: 12/1/2023 9:49:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Select Location records based on the CreatedBy column from dbo.Locations that contains the individual's user Id.
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Locations_Select_ByCreatedBy_Paginated]
	@CreatedBy int,
	@PageIndex int,
	@PageSize int


/* Test Code

Declare @CreatedBy int = 1,
	@PageIndex int = 0,
	@PageSize int = 5;

Execute dbo.Locations_Select_ByCreatedBy_Paginated 
@CreatedBy,
@PageIndex,
@PageSize

*/

as

Begin

Declare @offset int = @PageIndex * @PageSize

SELECT l.Id
      ,LocationTypeId
	  ,lt.Name as "Location Type"
      ,LineOne
      ,LineTwo
      ,City
      ,Zip
      ,StateId
	  ,s.Name as "State Name"
	  ,s.Code
      ,Latitude
      ,Longitude
	  ,TotalCount = COUNT(1) OVER()
  FROM [dbo].[Locations] as l 
  inner join dbo.LocationTypes as lt
  on l.LocationTypeId = lt.Id
  inner join dbo.states as s 
  on l.StateId = s.Id
  Where CreatedBy = @CreatedBy
  ORDER BY l.Id

  OFFSET @Offset Rows
  Fetch Next @PageSize Rows ONLY
 

End
GO
