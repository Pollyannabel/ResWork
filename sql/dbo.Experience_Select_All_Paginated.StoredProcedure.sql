USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Experience_Select_All_Paginated]    Script Date: 12/20/2023 6:44:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 12/2/2023
-- Description:	Select all Experience records from dbo.Experience in a paginated response
-- Code Reviewer: Thane Thompson

-- MODIFIED BY: Pollyanna Easterbrook
-- MODIFIED DATE: 12/20/23
-- Code Reviewer: Luca Chitayat
-- Note: Order by end date to allow null value when isCurrent is true.
-- =============================================

CREATE proc [dbo].[Experience_Select_All_Paginated]
	@PageIndex int,
	@PageSize int


/* Test Code

declare @PageIndex int = 0,
		@PageSize int = 10
execute dbo.Experience_Select_All_Paginated @PageIndex, @PageSize

*/




as

Begin

Declare @offset int = @PageIndex * @PageSize

SELECT e.Id
      ,UserId
	  ,ExperienceTypeId
	  ,et.Name
      ,[IsCurrent]
      ,[StartDate]
      ,[EndDate]
      ,[JobTitle]
      ,[CompanyName]
      ,[City]
      ,[State]
      ,[Country]
      ,[Description]
	  ,TotalCount = COUNT(1) OVER()
  FROM [dbo].[Experience] as e
  inner join dbo.ExperienceTypes as et
  on e.ExperienceTypeId = et.Id
  ORDER BY (CASE WHEN EndDate IS NULL THEN 0 ELSE 1 END),EndDate desc

  OFFSET @Offset Rows
  Fetch Next @PageSize Rows ONLY

End
GO
