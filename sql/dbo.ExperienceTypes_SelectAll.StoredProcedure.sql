USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[ExperienceTypes_SelectAll]    Script Date: 12/7/2023 1:29:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 12/4/2023
-- Description:	Select all types of Experiences from dbo.ExperienceTypes.
-- Code Reviewer: Thane Thompson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[ExperienceTypes_SelectAll]

as

/*
execute dbo.ExperienceTypes_SelectAll
*/

begin

SELECT [Id]
      ,[Name]
  FROM [dbo].[ExperienceTypes]


end

GO
