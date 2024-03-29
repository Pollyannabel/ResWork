USE [Resolvely]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetLocationJSON]    Script Date: 11/21/2023 6:06:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/20/2023
-- Description:	Select Location records from dbo.Locations based on Id.
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE FUNCTION  [dbo].[fn_GetLocationJSON](@Id int) RETURNS NVARCHAR(MAX)
AS

/*
Declare @Id int = 8;

execute [dbo].[fn_GeLocationJSON] @Id

*/

BEGIN
    DECLARE @LocationData nvarchar(MAX);
    SET @LocationData = (
				SELECT  l.Id
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
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			)
			return @LocationData
END
GO
