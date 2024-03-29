USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[LocationTypes_SelectAll]    Script Date: 11/21/2023 6:06:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Select all records from dbo.LocationTypes.
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[LocationTypes_SelectAll]


/* Test Code

Execute dbo.LocationTypes_SelectAll

*/

as

Begin


SELECT [Id]
      ,[Name]
  FROM [dbo].[LocationTypes]


End


GO
