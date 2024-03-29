USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Select_ById]    Script Date: 11/29/2023 4:30:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Select Location record based on the location's Id from dbo.Locations
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Locations_Select_ById]
	@Id int

/* Test Code

Declare @Id int = 3;

Execute dbo.Locations_Select_ById @Id

*/

as

Begin

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
  FROM [dbo].[Locations] as l 
  inner join dbo.LocationTypes as lt
  on l.LocationTypeId = lt.Id
  inner join dbo.states as s 
  on l.StateId = s.Id
  Where l.Id = @Id

End


GO
