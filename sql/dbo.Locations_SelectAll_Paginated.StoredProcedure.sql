USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Locations_SelectAll_Paginated]    Script Date: 11/29/2023 4:30:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Select all Location records from dbo.Locations.
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Locations_SelectAll_Paginated]
	@PageIndex int,
	@PageSize int


/* Test Code

Declare @PageIndex int = 0,
	@PageSize int = 5

Execute dbo.Locations_SelectAll_Paginated
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
  ORDER BY l.Id

  OFFSET @Offset Rows
  Fetch Next @PageSize Rows ONLY
 

End
GO
